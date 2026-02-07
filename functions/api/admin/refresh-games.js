// GET /api/admin/refresh-games?key=...
// Fetches popular games from Roblox and stores in KV
// v1.1 - KV binding support

import { generateTags } from '../../lib/tags-config.js';

const MIN_PLAYING = 500;
const MIN_VISITS_FALLBACK = 1000000;
const CACHE_KEY = 'games_pool_v1';

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const authKey = url.searchParams.get('key');

  // Auth check
  const expectedKey = env.GAMES_REFRESH_KEY;
  if (expectedKey && authKey !== expectedKey) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Check if KV is bound
  if (!env.ROBPROFILE_CACHE) {
    return new Response(JSON.stringify({
      error: 'KV not configured',
      help: 'Add ROBPROFILE_CACHE KV binding in Cloudflare Pages settings'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Fetch games from multiple sources
    const games = await fetchAllGames();

    if (games.length === 0) {
      return new Response(JSON.stringify({
        error: 'No games fetched',
        message: 'Roblox API may be unavailable'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Store in KV
    const poolData = {
      updatedAt: new Date().toISOString(),
      source: 'roblox public api',
      count: games.length,
      items: games
    };

    await env.ROBPROFILE_CACHE.put(CACHE_KEY, JSON.stringify(poolData), {
      expirationTtl: 6 * 60 * 60 // 6 hours
    });

    return new Response(JSON.stringify({
      success: true,
      message: `Stored ${games.length} games in KV`,
      updatedAt: poolData.updatedAt,
      sample: games.slice(0, 3).map(g => ({ name: g.name, playing: g.playing, tags: g.tags }))
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error('Refresh games error:', err);
    return new Response(JSON.stringify({
      error: 'Failed to refresh games',
      details: err.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Fetch games from multiple Roblox API sources
 */
async function fetchAllGames() {
  const allGames = new Map();

  // Source 1: Games API - Popular sorts
  try {
    const sortTokens = ['GamesPageMostEngagingSort', 'GamesPageHomeSorts'];

    for (const sortToken of sortTokens) {
      const url = `https://games.roblox.com/v1/games/list?model.sortToken=${sortToken}&model.maxRows=50`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        const gameEntries = data.games || [];

        for (const g of gameEntries) {
          if (g.universeId && !allGames.has(g.universeId)) {
            allGames.set(g.universeId, {
              universeId: g.universeId,
              placeId: g.placeId
            });
          }
        }
      }
    }
  } catch (e) {
    console.error('Games list fetch error:', e);
  }

  // Source 2: Discover API (explore-api)
  try {
    const sessionId = crypto.randomUUID();
    const sortsUrl = `https://apis.roblox.com/explore-api/v1/get-sorts?sessionId=${sessionId}`;
    const sortsResponse = await fetch(sortsUrl);

    if (sortsResponse.ok) {
      const sortsData = await sortsResponse.json();
      const sorts = sortsData.sorts || [];

      // Get first 3 useful sorts
      const usefulSorts = sorts.slice(0, 3);

      for (const sort of usefulSorts) {
        try {
          const sortId = sort.topicId || sort.sortId || sort.token;
          const contentUrl = `https://apis.roblox.com/explore-api/v1/get-sort-content?sessionId=${sessionId}&sortId=${sortId}`;
          const contentResponse = await fetch(contentUrl);

          if (contentResponse.ok) {
            const contentData = await contentResponse.json();
            const experiences = contentData.experiences || contentData.games || [];

            for (const exp of experiences) {
              const universeId = exp.universeId || exp.placeId;
              if (universeId && !allGames.has(universeId)) {
                allGames.set(universeId, {
                  universeId,
                  placeId: exp.placeId || exp.rootPlaceId
                });
              }
            }
          }
        } catch (e) {
          console.error('Sort content error:', e);
        }
      }
    }
  } catch (e) {
    console.error('Discover API error:', e);
  }

  // Fetch full metadata for all collected games
  const universeIds = Array.from(allGames.keys());
  const gamesWithMeta = await fetchGamesMetadata(universeIds);

  // Filter and tag games
  const filteredGames = gamesWithMeta
    .filter(g => {
      // Filter by playing count or visits
      if (g.playing >= MIN_PLAYING) return true;
      if (!g.playing && g.visits >= MIN_VISITS_FALLBACK) return true;
      return false;
    })
    .map(g => ({
      universeId: g.universeId,
      placeId: g.rootPlaceId,
      name: g.name,
      description: (g.description || '').slice(0, 500),
      creatorName: g.creator?.name || 'Unknown',
      playing: g.playing || 0,
      visits: g.visits || 0,
      favorites: g.favoritedCount || 0,
      genre: g.genre || '',
      iconUrl: `https://thumbnails.roblox.com/v1/games/icons?universeIds=${g.universeId}&size=150x150&format=Png`,
      gameUrl: `https://www.roblox.com/games/${g.rootPlaceId}`,
      tags: generateTags(g)
    }));

  return filteredGames;
}

/**
 * Batch fetch game metadata
 */
async function fetchGamesMetadata(universeIds) {
  const games = [];
  const batchSize = 100;

  for (let i = 0; i < universeIds.length; i += batchSize) {
    const batch = universeIds.slice(i, i + batchSize);
    const url = `https://games.roblox.com/v1/games?universeIds=${batch.join(',')}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        for (const game of (data.data || [])) {
          games.push({
            universeId: game.id,
            rootPlaceId: game.rootPlaceId,
            name: game.name,
            description: game.description,
            genre: game.genre,
            playing: game.playing,
            visits: game.visits,
            favoritedCount: game.favoritedCount,
            maxPlayers: game.maxPlayers,
            created: game.created,
            updated: game.updated,
            creator: game.creator
          });
        }
      }
    } catch (e) {
      console.error('Metadata batch error:', e);
    }
  }

  return games;
}

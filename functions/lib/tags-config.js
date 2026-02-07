// Tags Configuration for Game Pool Tagging
// Maps keywords to archetype tags

export const ARCHETYPE_KEYWORDS = {
  explorer: {
    keywords: ['adventure', 'explore', 'discovery', 'world', 'quest', 'mystery', 'horror', 'survival', 'story', 'journey', 'dungeon'],
    weight: 1.0
  },
  grinder: {
    keywords: ['simulator', 'tycoon', 'idle', 'clicker', 'upgrade', 'farm', 'grind', 'afk', 'rebirth', 'prestige', 'incremental'],
    weight: 1.0
  },
  socializer: {
    keywords: ['hangout', 'social', 'party', 'cafe', 'club', 'vibe', 'chill', 'friends', 'chat', 'town', 'city', 'life'],
    weight: 1.0
  },
  competitor: {
    keywords: ['pvp', 'fps', 'shooter', 'battle', 'arena', 'fight', 'war', 'combat', 'ranked', 'tournament', 'competitive'],
    weight: 1.0
  },
  builder: {
    keywords: ['build', 'create', 'sandbox', 'craft', 'design', 'construct', 'creative', 'architect', 'studio', 'block'],
    weight: 1.0
  },
  trader: {
    keywords: ['trade', 'trading', 'market', 'economy', 'shop', 'business', 'money', 'rich', 'millionaire', 'tycoon'],
    weight: 1.0
  },
  roleplayer: {
    keywords: ['roleplay', 'rp', 'story', 'family', 'adopt', 'school', 'hospital', 'brookhaven', 'bloxburg', 'life'],
    weight: 1.0
  },
  casual: {
    keywords: ['obby', 'obstacle', 'parkour', 'escape', 'tower', 'race', 'racing', 'minigame', 'easy', 'fun', 'simple'],
    weight: 1.0
  }
};

// Genre to archetype mapping
export const GENRE_MAPPING = {
  'Adventure': ['explorer'],
  'Horror': ['explorer'],
  'Survival': ['explorer', 'grinder'],
  'RPG': ['explorer', 'roleplayer'],
  'Simulation': ['grinder'],
  'Tycoon': ['grinder', 'trader'],
  'Fighting': ['competitor'],
  'FPS': ['competitor'],
  'Sports': ['competitor'],
  'Town and City': ['socializer', 'roleplayer'],
  'Comedy': ['casual'],
  'Sci-Fi': ['explorer'],
  'Fantasy': ['explorer', 'roleplayer'],
  'Naval': ['explorer'],
  'Military': ['competitor'],
  'Building': ['builder'],
  'Medieval': ['roleplayer', 'competitor']
};

/**
 * Generate tags for a game based on name, description, and genre
 */
export function generateTags(game) {
  const tags = new Set();
  const textToSearch = `${game.name || ''} ${game.description || ''}`.toLowerCase();

  // 1. Keyword-based tagging
  for (const [archetype, config] of Object.entries(ARCHETYPE_KEYWORDS)) {
    for (const keyword of config.keywords) {
      if (textToSearch.includes(keyword)) {
        tags.add(archetype);
        break; // One match per archetype is enough
      }
    }
  }

  // 2. Genre-based tagging
  if (game.genre && GENRE_MAPPING[game.genre]) {
    GENRE_MAPPING[game.genre].forEach(tag => tags.add(tag));
  }

  // 3. High player count = likely socializer
  if (game.playing && game.playing >= 10000) {
    tags.add('socializer');
  }

  // 4. If no tags found, add casual as default
  if (tags.size === 0) {
    tags.add('casual');
  }

  return Array.from(tags);
}

/**
 * Calculate recommendation score for a game
 * @param {Object} game - Game with tags
 * @param {Object} archetypeScores - User's archetype scores (0-1 each)
 * @returns {number} Score 0-100
 */
export function calculateRecommendScore(game, archetypeScores) {
  const tags = game.tags || [];

  // Base match score from tag overlap
  let matchScore = 0;
  let matchedTags = [];

  for (const tag of tags) {
    const userScore = archetypeScores[tag] || 0;
    if (userScore > 0) {
      matchScore += userScore * ARCHETYPE_KEYWORDS[tag]?.weight || 1;
      matchedTags.push(tag);
    }
  }

  // Normalize match score (0-1)
  const normalizedMatch = Math.min(matchScore / (tags.length || 1), 1);

  // Popularity bonus (log scale, 0-0.3)
  let popularityBonus = 0;
  if (game.playing && game.playing > 0) {
    // Log scale: 500 = 0.1, 5000 = 0.2, 50000 = 0.3
    const logPlaying = Math.log10(game.playing);
    popularityBonus = Math.min((logPlaying - 2.5) / 5, 0.3);
    popularityBonus = Math.max(popularityBonus, 0);
  }

  // Final score: 70% match + 30% popularity
  const finalScore = Math.round(100 * (0.7 * normalizedMatch + 0.3 * (popularityBonus / 0.3)));

  return {
    score: Math.min(Math.max(finalScore, 0), 100),
    matchedTags
  };
}

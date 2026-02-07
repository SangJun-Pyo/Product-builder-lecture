// GET /api/debug/env
// Diagnostic endpoint to verify environment bindings
// Does NOT expose sensitive values - only checks existence

export async function onRequestGet(context) {
  const { env } = context;

  // Check KV binding
  const hasKV = !!(env.ROBPROFILE_CACHE);

  // Check if KV has expected methods (sanity check)
  let kvType = null;
  if (hasKV) {
    kvType = typeof env.ROBPROFILE_CACHE;
    // KV namespace should have get/put/delete methods
  }

  // Check refresh key
  const hasRefreshKey = !!(env.GAMES_REFRESH_KEY);

  // Get all env keys (filter out sensitive ones)
  const sensitivePatterns = ['KEY', 'SECRET', 'TOKEN', 'PASSWORD', 'CREDENTIAL'];
  const allKeys = Object.keys(env);
  const safeKeys = allKeys.filter(key => {
    const upperKey = key.toUpperCase();
    return !sensitivePatterns.some(pattern => upperKey.includes(pattern));
  });

  // Check specific bindings
  const bindings = {
    ROBPROFILE_CACHE: hasKV ? (typeof env.ROBPROFILE_CACHE) : 'undefined',
  };

  return new Response(JSON.stringify({
    hasKV,
    hasRefreshKey,
    kvType,
    envKeyCount: allKeys.length,
    safeEnvKeys: safeKeys,
    bindings,
    timestamp: new Date().toISOString()
  }, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    }
  });
}

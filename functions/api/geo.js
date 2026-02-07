// GET /api/geo
// Returns user's country code from Cloudflare headers for locale detection

export async function onRequestGet(context) {
  const { request } = context;

  // Cloudflare provides CF-IPCountry header
  const country = request.headers.get('CF-IPCountry') || 'US';

  return new Response(
    JSON.stringify({ country }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store' // Don't cache - IP can change
      }
    }
  );
}

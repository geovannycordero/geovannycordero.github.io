// Frozen at build time, same as the original — app/health.json/route.ts
// was already `force-static`, so BUILT_AT was never per-request either.
function generateHealthJson() {
  return JSON.stringify({ status: 'ok', built_at: new Date().toISOString() });
}

module.exports = { generateHealthJson };

/* =========================================================
   Lightweight rate limiter — POST /api/contact only.

   Intentionally minimal: an in-memory sliding window per client IP,
   no extra dependency. This is enough to blunt obvious spam/abuse
   against a single-purpose contact endpoint on a personal portfolio
   without touching the rest of the site.

   Not meant to survive process restarts or scale across multiple
   server instances — if this API is ever deployed behind a load
   balancer with multiple Node processes, swap this for a shared store
   (e.g. Redis-backed) instead.
========================================================= */
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

/** @type {Map<string, number[]>} IP -> timestamps of requests in-window */
const requestLog = new Map();

function contactRateLimiter(req, res, next) {
  const ip = req.ip || req.socket?.remoteAddress || "unknown";
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  const recent = (requestLog.get(ip) || []).filter((t) => t > windowStart);
  recent.push(now);
  requestLog.set(ip, recent);

  if (recent.length > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      success: false,
      message: "Too many messages sent recently. Please try again later.",
    });
  }

  next();
}

// Periodic sweep so the map doesn't grow unbounded on a long-running
// process. `.unref()` keeps this timer from holding the process open.
setInterval(() => {
  const cutoff = Date.now() - WINDOW_MS;
  for (const [ip, timestamps] of requestLog) {
    const fresh = timestamps.filter((t) => t > cutoff);
    if (fresh.length === 0) requestLog.delete(ip);
    else requestLog.set(ip, fresh);
  }
}, WINDOW_MS).unref();

module.exports = contactRateLimiter;

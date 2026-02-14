const noCache = (req, res, next) => {
  // Disable all forms of caching (browser, proxy, CDN) for sensitive data
  res.set("Cache-Control", "no-cache, no-store, must-revalidate, private");
  // Mark the response as immediately stale
  res.set("Expires", "0");
  next();
};

module.exports = {noCache}
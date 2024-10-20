// Import the required modules
const etag = require("etag");
const NodeCache = require("node-cache");

// Create a new instance of NodeCache
const cache = new NodeCache({ useClones: false });

const checkCacheMiddleware = (req, res, next) => {
  const cachedAthletes = cache.get("athletes"); // Get cached athletes data

  // Check if athletes data exists in the cache
  if (cachedAthletes) {
    // Generate ETag for the cached athletes data
    const currentEtag = etag(JSON.stringify(cachedAthletes));

    // Compare the ETag with the one provided in the request headers
    if (req.headers["if-none-match"] === currentEtag) {
      // If ETags match, set notModified flag to true
      req.notModified = true;
    } else {
      // If ETags do not match, attach cached data to the request object
      req.cacheData = cachedAthletes;
    }
  }

  next(); // Move to the next middleware
};

// Middleware to set the athletes data in the cache
const setCacheMiddleware = (req, res, next) => {
  // Set the athletes data in the cache with a TTL of 3600 seconds
  cache.set("athletes", req.data, 3600);
  // Set the ETag header in the response
  res.set("ETag", etag(JSON.stringify(req.data)));
  // Control returns to the calling middleware
};

// Export the middleware functions
module.exports = {
  checkCacheMiddleware,
  setCacheMiddleware,
};

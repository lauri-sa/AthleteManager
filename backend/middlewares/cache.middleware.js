const etag = require("etag");
const NodeCache = require("node-cache");

const cache = new NodeCache({ useClones: false });

const checkCacheMiddleware = (req, res, next) => {
  const cachedAthletes = cache.get("athletes");

  if (cachedAthletes) {
    const currentEtag = etag(JSON.stringify(cachedAthletes));

    if (req.headers["if-none-match"] === currentEtag) {
      req.notModified = true;
    } else {
      req.cacheData = cachedAthletes;
    }
  }

  next();
};

const setCacheMiddleware = (req, res, next) => {
  cache.set("athletes", req.data, 3600);
  res.set("ETag", etag(JSON.stringify(req.data)));
};

module.exports = {
  checkCacheMiddleware,
  setCacheMiddleware,
};

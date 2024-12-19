const redis = require("redis");
const client = redis.createClient();

client.on("error", (err) => console.error("Redis error:", err));

const cacheMiddleware = async (req, res, next) => {
    const key = req.originalUrl;
    client.get(key, (err, cachedData) => {
        if (err) throw err;

        if (cachedData) {
            res.setHeader("x-cache", "HIT");
            return res.send(JSON.parse(cachedData));
        }

        res.setHeader("x-cache", "MISS");
        res.sendResponse = res.send;
        res.send = (body) => {
            client.setex(key, 3600, JSON.stringify(body)); // Cache for 1 hour
            res.sendResponse(body);
        };

        next();
    });
};

module.exports = cacheMiddleware;

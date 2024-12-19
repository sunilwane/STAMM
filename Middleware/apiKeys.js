const apiKeys = ["your_generated_api_key"]; // Store securely

const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey || !apiKeys.includes(apiKey)) {
        return res.status(403).json({ message: "Forbidden: Invalid API Key" });
    }
    next();
};

module.exports = apiKeyMiddleware;

// require("dotenv").config()
const express = require("express");
const helmet = require("helmet");
const limiter = require("./Middleware/rate_limit");
const cacheMiddleware = require("./utils/radisCache");
const requestTransformer = require("./Middleware/requestTransformer");
const responseTransformer = require("./Middleware/responseTransformer");
const apiKeyMiddleware = require("./Middleware/apiKeys");
const adminRoutes = require("./Routes/admin");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(requestTransformer);
app.use(responseTransformer);
app.use(apiKeyMiddleware);
app.use("/admin", cacheMiddleware, adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));

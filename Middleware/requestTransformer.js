const requestTransformer = (req, res, next) => {
    req.headers["x-custom-header"] = "transformed-request";
    if (req.body && typeof req.body === "object") {
        req.body.transformed = true;
    }

    next();
};

module.exports = {
    requestTransformer
}
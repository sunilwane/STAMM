const responseTransformer = (req, res, next) => {
    const originalSend = res.send;

    res.send = (body) => {
        // Transform the response body (if JSON)
        if (typeof body === "object") {
            body.transformed = true;
        }
        
        res.set("x-response-custom-header", "transformed-response");

        originalSend.call(res, body);
    };

    next();
};

module.exports = {
    responseTransformer
}
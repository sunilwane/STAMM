let serverIndex = 0;
const servers = ["http://backend1.example.com", "http://backend2.example.com"];

const loadBalancer = (req, res, next) => {
    const targetServer = servers[serverIndex];
    serverIndex = (serverIndex + 1) % servers.length;

    req.url = targetServer + req.url;
    next();
};

module.exports = {loadBalancer};

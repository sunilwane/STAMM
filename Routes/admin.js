const express = require("express");
const router = express.Router();
const { authenticateJWT, authorizeRole } = require("../Middleware/auth");

router.get("/", authenticateJWT, authorizeRole("Admin"), (req, res) => {
    res.json({ message: "Welcome, Admin!" });
});

module.exports = router;

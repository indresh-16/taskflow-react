const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {

    console.log("========== VERIFY TOKEN ==========");
    console.log("METHOD:", req.method);
    console.log("URL:", req.originalUrl);
    console.log("AUTH HEADER:", req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.log("❌ NO AUTH HEADER");

        return res.status(401).json({
            message: "Token missing"
        });
    }

    const parts = authHeader.split(" ");

    console.log("AUTH PARTS:", parts);

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        console.log("❌ BAD BEARER FORMAT");

        return res.status(401).json({
            message: "Invalid Authorization format"
        });
    }

    const token = parts[1];

    console.log("TOKEN:", token);

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("✅ JWT VALID:", decoded);

        req.user = decoded;

        next();

    } catch (error) {

        console.log("❌ JWT ERROR:", error.message);

        return res.status(401).json({
            message: "Invalid token"
        });
    }
}

module.exports = verifyToken;
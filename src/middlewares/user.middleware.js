const User = require("../models/users.model");
const { verifyToken } = require("../utilities/jwt");

// Middleware for authenticating using JWT token
const authentication = async (req, res, next) => {
    try {
        // Retrieve the token from the 'Authorization' header or cookies
        const token = req.cookies.authToken || req.headers.authorization?.split(" ")[1]; // Check for Bearer token

        // Check if token is provided
        if (!token) {
            return res.status(401).json({ message: "Unauthorized, token missing" });
        }

        // Verify the token
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized, invalid token" });
        }

        // Find the user using the ID from the token
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized, user not found" });
        }

        // Attach user information to the request object
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in authenticating user:", error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Unauthorized, token expired" });
        }

        return res.status(500).json({ message: "Server error during authentication", error: error.message });
    }
};

module.exports = authentication;

const User = require("../models/users.model");
const { verifyToken } = require("../utilities/jwt");

// Authentication part using the JWT token
const authentication = async (req, res, next) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in authorising user:", error);
        return res.status(500).send({ message: "Error in authorising user", error: error.message });
    }
};
module.exports =authentication;
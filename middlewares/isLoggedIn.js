import jwt from 'jsonwebtoken'
import User from '../models/Farmer.js'
export const isLoggedIn = async (req, res, next) => {
    try {
        // if (req.isAuthenticated()) return next();

        const token = req.cookies.token;
        if (!token) {
            return res.redirect("/login");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return res.redirect("/login");
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Auth error:", err.message);

        if (err.name === "TokenExpiredError") {
            return res.redirect("/slogin");
        } else if (err.name === "JsonWebTokenError") {
            return res.status(401).send("Invalid token.");
        }

        return res.status(500).send("Error in login");
    }
}
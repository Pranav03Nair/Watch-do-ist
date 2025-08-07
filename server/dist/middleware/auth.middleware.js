import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized - Missing Token" });
    }
    const token = authHeader.split(" ")[1];
    try {
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - Missing Token" });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
//# sourceMappingURL=auth.middleware.js.map
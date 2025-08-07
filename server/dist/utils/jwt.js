import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const signToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1d" });
};
export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
//# sourceMappingURL=jwt.js.map
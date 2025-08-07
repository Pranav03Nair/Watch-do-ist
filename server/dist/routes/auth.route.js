import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
const router = Router();
router.post("/register", register);
router.post("/login", login);
// For Testing - WORKING
router.get("/checkAuth", requireAuth, (req, res) => {
    // @ts-ignore
    res.json({ message: "Auth Working", userId: req.userId });
});
export default router;
//# sourceMappingURL=auth.route.js.map
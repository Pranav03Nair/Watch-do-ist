import type { Request, Response } from "express";
import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// For Testing - WORKING
router.get("/checkAuth", requireAuth, (req: Request, res: Response) => {
  res.json({ message: "Auth Working", userId: req.userId });
});

export default router;

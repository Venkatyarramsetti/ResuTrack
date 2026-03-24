import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import { strictLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/register", register);
router.post("/login", strictLimiter, login);

export default router;

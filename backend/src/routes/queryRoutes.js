import { Router } from "express";
import { sendQuery } from "../controllers/queryController.js";

const router = Router();

router.post("/send-query", sendQuery);

export default router;

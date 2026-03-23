import { Router } from "express";
import { analyzeImage } from "../controllers/analysisController.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.post("/image-analyze", upload.single("image"), analyzeImage);

export default router;

import fs from "fs/promises";
import { analyzeImageWithPrompt } from "../services/groqService.js";

export async function analyzeImage(req, res) {
  let imagePath;

  try {
    const prompt = req.body.prompt || "Describe the image";

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    imagePath = req.file.path;
    const imageBuffer = await fs.readFile(imagePath);
    const imageBase64 = imageBuffer.toString("base64");

    const analysis = await analyzeImageWithPrompt({
      mimeType: req.file.mimetype,
      imageBase64,
      prompt,
    });

    return res.json({ analysis });
  } catch (error) {
    console.error("Image analysis error:", error);
    return res.status(500).json({ error: "Failed to analyze image" });
  } finally {
    if (imagePath) {
      await fs.unlink(imagePath).catch(() => {});
    }
  }
}

import { analyzeImageWithPrompt } from "../services/groqService.js";

export async function analyzeImage(req, res) {
  try {
    const prompt = req.body.prompt || "Describe the image";

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const imageUrl = req.file.path;
    if (!imageUrl) {
      return res.status(400).json({ error: "Uploaded file URL not found" });
    }

    const analysis = await analyzeImageWithPrompt({
      imageUrl,
      prompt,
    });

    return res.json({ analysis });
  } catch (error) {
    console.error("Image analysis error:", error);
    return res.status(500).json({ error: "Failed to analyze image" });
  }
}

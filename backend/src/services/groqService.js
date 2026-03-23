import Groq from "groq-sdk";
import { env } from "../config/env.js";

const groq = new Groq({ apiKey: env.groqApiKey });

export async function analyzeImageWithPrompt({ mimeType, imageBase64, prompt }) {
  const result = await groq.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: { url: `data:${mimeType};base64,${imageBase64}` },
          },
          { type: "text", text: prompt },
        ],
      },
    ],
  });

  return result.choices[0]?.message?.content || "No analysis returned";
}

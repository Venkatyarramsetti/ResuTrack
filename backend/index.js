import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Ensure user_data directory exists
const userDataDir = path.join(__dirname, 'user_data');
if (!fs.existsSync(userDataDir)) {
  fs.mkdirSync(userDataDir);
}

const upload = multer({ dest: "uploads/" });

const genAI = new GoogleGenerativeAI("AIzaSyCZ5PaDHQxuyB8zWod8c6KO-XqS1-AfpGM");

// Test route to verify server is up
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// Image analysis route
app.post("/image-analyze", upload.single("image"), async (req, res) => {
  try {
    const prompt = req.body.prompt || "Describe the image";
    const imagePath = req.file.path;
    const imageBuffer = fs.readFileSync(imagePath);
    const imageBase64 = imageBuffer.toString("base64");

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const result = await model.generateContent([{
      inlineData: {
        mimeType: req.file.mimetype,
        data: imageBase64,
      },
    }, {
      text: prompt,
    }]);

    fs.unlinkSync(imagePath); // Clean up the uploaded file

    const response = await result.response;
    const text = response.text();
    res.json({ analysis: text });
  } catch (error) {
    console.error("Image analysis error:", error);
    res.status(500).json({ error: "Failed to analyze image" });
  }
});

// Registration route
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const userFilePath = path.join(__dirname, 'user_data', `${email}.json`);

  if (fs.existsSync(userFilePath)) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = { name, email, password }; // In a real app, you should hash passwords

  fs.writeFileSync(userFilePath, JSON.stringify(newUser));

  res.status(200).json({ message: "User registered successfully" });
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const userFilePath = path.join(__dirname, 'user_data', `${email}.json`);

  if (!fs.existsSync(userFilePath)) {
    return res.status(400).json({ error: "User does not exist" });
  }

  const user = JSON.parse(fs.readFileSync(userFilePath));

  if (user.password !== password) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  res.status(200).json({ message: "Logged in successfully" });
});

// Start the server on the dynamic port assigned by Render (or 2051 locally)
const port = process.env.PORT || 2051;
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});

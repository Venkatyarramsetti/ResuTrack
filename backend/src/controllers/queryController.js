import { sendSupportQuery } from "../services/mailService.js";

export async function sendQuery(req, res) {
  const { email, query } = req.body;

  if (!email || !query) {
    return res.status(400).json({ error: "Email and query are required" });
  }

  try {
    await sendSupportQuery({ fromEmail: email, query });
    return res.status(200).json({ message: "Query sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({ error: "Failed to send query" });
  }
}

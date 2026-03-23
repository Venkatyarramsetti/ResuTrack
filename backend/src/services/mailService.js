import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const receiverEmail = "yarramsettisai33@gmail.com";

function buildTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.emailUser,
      pass: env.emailPass,
    },
  });
}

export async function sendSupportQuery({ fromEmail, query }) {
  const transporter = buildTransporter();

  await transporter.sendMail({
    from: fromEmail,
    to: receiverEmail,
    subject: "New Query from ResuTrack Website",
    text: `You have received a new query:\n\nEmail: ${fromEmail}\nQuery: ${query}`,
  });
}

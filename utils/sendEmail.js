import nodemailer from "nodemailer";
import { html } from "./htmlEmail";
const sendEmail = async ({ to, url, text }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "RB's Coding | NextAuthv4",
    html: html({ url, text }),
  };

  const result = await transporter.sendMail(mailOptions);
  return result;
};
export default sendEmail;

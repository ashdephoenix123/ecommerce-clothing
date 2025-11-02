import { sender } from "@/constants/globals";
import connectDB from "@/middleware/conn";
import { SendSmtpEmail, TransactionalEmailsApi } from "@getbrevo/brevo";
import User from "../../models/User";
const CryptoJS = require("crypto-js");

export default async function handler(req, res) {
  // if (req.method === "OPTIONS") {
  //   return res.status(200).end();
  // }
  try {
    if (req.method === "POST") {
      const { name, email } = req.body;
      await connectDB();
      const findUser = await User.findOne({ email });
      if (findUser) throw new Error("Email already exists.");
      const user = new User({
        name: name,
        email: email,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.CRYPTO_KEY
        ).toString(),
      });
      const result = await user.save();
      if (result) {
        //   send mail
        let emailAPI = new TransactionalEmailsApi();
        emailAPI.authentications.apiKey.apiKey = process.env.BREVO_API;
        let message = new SendSmtpEmail();
        message.templateId = 5;
        message.params = { name: req.body.name };

        message.sender = {
          name: sender.name,
          email: sender.email,
        };
        message.to = [{ email: req.body.email, name: req.body.name }];
        try {
          await emailAPI.sendTransacEmail(message);
        } catch (err) {
          console.error("Brevo send error:", err.response?.text || err.message);
          throw new Error("Failed to send email");
        }

        res.status(201).json({ success: true });
      }
    } else {
      throw new Error("Request method not allowed");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

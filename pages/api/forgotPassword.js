import connectDB from "@/middleware/conn";
import User from "@/models/User";
import Forgot from "@/models/Forgot";
import { SendSmtpEmail, TransactionalEmailsApi } from "@getbrevo/brevo";
import { sender } from "@/constants/globals";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      await connectDB();
      const findUser = await User.findOne({ email: req.body.email });
      if (!findUser) throw new Error("User not registered! Please Sign up!");
      const token = Math.random().toString(36).substring(2) + Date.now();
      let url = `${process.env.NEXT_PUBLIC_HOST}/forgot?id=${token}`;
      const forgot = new Forgot({
        email: req.body.email,
        token: token,
      });
      await forgot.save();
      // Send mail
      let emailAPI = new TransactionalEmailsApi();
      emailAPI.authentications.apiKey.apiKey = process.env.BREVO_API;
      let message = new SendSmtpEmail();
      message.templateId = 4;
      message.params = { link: url };

      message.sender = {
        name: sender.name,
        email: sender.email,
      };
      message.to = [{ email: req.body.email, name: "User" }];
      emailAPI
        .sendTransacEmail(message)
        .then((res) => {
          console.log(JSON.stringify(res.body));
        })
        .catch((err) => {
          console.error("Error sending email:", err.body);
        });

      res.status(200).json({ success: true });
    } else {
      throw new Error("Request method not allowed");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
}

import { sender } from "@/constants/globals";
import connectDB from "@/middleware/conn";
import Forgot from "@/models/Forgot";
import User from "@/models/User";
import { SendSmtpEmail, TransactionalEmailsApi } from "@getbrevo/brevo";
const CryptoJS = require("crypto-js");

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { newpassword, token } = req.body;
      await connectDB();
      const checkToken = await Forgot.findOne({ token });
      if (!checkToken)
        throw new Error("Request cannot be fulfilled. Please try again later.");
      const userdetails = await User.findOneAndUpdate(
        { email: checkToken.email },
        {
          password: CryptoJS.AES.encrypt(
            newpassword,
            process.env.CRYPTO_KEY
          ).toString(),
        }
      );
      // send mail
      let emailAPI = new TransactionalEmailsApi();
      emailAPI.authentications.apiKey.apiKey = process.env.BREVO_API;
      let message = new SendSmtpEmail();
      message.templateId = 6;
      message.params = {
        name: userdetails.name,
        email: userdetails.email,
      };

      message.sender = {
        name: sender.name,
        email: sender.email,
      };
      message.to = [{ email: userdetails.email, name: userdetails.name }];
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
      throw new Error("Request method not allowed!");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

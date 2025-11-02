import connectDB from "@/middleware/conn";
import User from "../../models/User";
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { email } = req.body;
      await connectDB();
      const findUser = await User.findOne({ email });
      if (!findUser) {
        throw new Error("Email is not registered. Please Signup!");
      } else {
        let bytes = CryptoJS.AES.decrypt(
          findUser.password,
          process.env.CRYPTO_KEY
        );
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        if (req.body.password !== originalText) {
          throw new Error("Invalid Credentials!");
        } else {
          let token = jwt.sign(
            { email: findUser.email, password: findUser.password },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
          );
          res.status(201).json({ success: true, token });
        }
      }
    } else {
      throw new Error("Request method not allowed");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

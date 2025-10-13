import Forgot from "@/models/Forgot";
import User from "@/models/User";
import connectDB from "@/middleware/conn";
const CryptoJS = require("crypto-js");

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { newpassword, token } = req.body;
      await connectDB();
      const checkToken = await Forgot.findOne({ token });
      if (!checkToken)
        throw new Error("Request cannot be fulfilled. Please try again later.");
      await User.findOneAndUpdate(
        { email: checkToken.email },
        {
          password: CryptoJS.AES.encrypt(
            newpassword,
            process.env.CRYPTO_KEY
          ).toString(),
        }
      );
      res.status(200).json({ success: true });
    } else {
      throw new Error("Request method not allowed!");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

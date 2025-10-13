import connectDB from "@/middleware/conn";
import User from "@/models/User";
import Forgot from "@/models/Forgot";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      await connectDB();
      const findUser = await User.findOne({ email: req.body.email });
      if (!findUser) throw new Error("User not registered! Please Sign up!");
      const token = Math.random().toString(36).substring(2) + Date.now();
      console.log(`http://nextecomm.netlify.app/forgot?id=${token}`);
             const forgot = new Forgot({
        email: req.body.email,
        token: token,
      });
      await forgot.save();
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

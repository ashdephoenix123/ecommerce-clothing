import connectDB from "@/middleware/conn";
import User from "../../models/User";
import { serialize } from "cookie";
import { allowedOrigins } from "@/config/allowedDomains";
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  // --- NEW: CORS Whitelist Logic ---
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true"); // <-- Crucial for cookies
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
  }
  // --- END NEW CORS LOGIC ---

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (req.method === "POST") {
      const { email } = req.body;
      if (email !== "admin@sharkk.com")
        throw new Error("Please use admin login credentials!");

      await connectDB();

      const findUser = await User.findOne({ email });
      if (!findUser) {
        throw new Error("Admin credentials not found in the Database!");
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
            { email: findUser.email, userId: findUser._id },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
          );

          // --- UPDATED COOKIE LOGIC ---
          const cookieOptions = {
            httpOnly: true,
            secure: true, // `secure` must be true for SameSite=None
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
            sameSite: "None",
          };
          // --- END UPDATED COOKIE LOGIC ---

          const cookie = serialize("auth-token", token, cookieOptions);
          res.setHeader("Set-Cookie", cookie);
          res.status(200).json({ success: true });
        }
      }
    } else {
      throw new Error("Request method not allowed");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

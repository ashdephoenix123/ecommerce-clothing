import { serialize } from "cookie";

export default async function handler(req, res) {
  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // We only want to allow POST requests for the actual logout
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // --- The Logout Logic ---

    // 1. Define the cookie options for an *expired* cookie.
    // We MUST match the same `SameSite`, `Secure`, and `Path` properties
    // used to set the cookie.
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 0, // <-- Set to 0 to expire immediately
      path: "/",
      sameSite: "Strict", // <-- Must match the login cookie's setting
    };

    // 2. Serialize the cookie with an empty value and expired maxAge
    const cookie = serialize("auth-token", "", cookieOptions);

    // 3. Set the 'Set-Cookie' header
    res.setHeader("Set-Cookie", cookie);

    // 4. Send a success response
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

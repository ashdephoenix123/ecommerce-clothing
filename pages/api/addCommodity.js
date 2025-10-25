import connectDB from "@/middleware/conn";
import Commodity from "@/models/Commodity"; // Adjust this path if needed

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (req.method === "POST") {
      await connectDB();
      const { name, variants } = req.body;

      if (!name) {
        throw new Error("name is required!");
      }
      if (!variants || !Array.isArray(variants) || variants.length === 0) {
        throw new Error("variants must be a non-empty array!");
      }
      const newCommodity = new Commodity(req.body);
      await newCommodity.save();

      res.status(201).json({ success: true, commodity: newCommodity });
    } else {
      throw new Error("Requested method not allowed!");
    }
  } catch (error) {
    console.log(error);
    // ... (rest of your error handling)
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ error: messages.join(", ") });
    }

    // This will catch duplicate SKUs if one *was* provided
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "A commodity with this SKU already exists." });
    }

    res.status(400).json({ error: error.message });
  }
}

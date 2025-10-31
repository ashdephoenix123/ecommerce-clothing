import connectDB from "@/middleware/conn";
import Brand from "@/models/Brands";
import slugify from "slugify"; // Make sure Brand model imports this if it does slugify 'pre-save'

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  // We only want to allow POST requests for this endpoint
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method Not Allowed" });
  }

  try {
    await connectDB();

    const { label } = req.body;

    if (!label) {
      return res
        .status(400)
        .json({ success: false, error: "Brand label is required." });
    }

    // Check if brand already exists (case-insensitive)
    const existingBrand = await Brand.findOne({
      label: { $regex: new RegExp(`^${label}$`, "i") },
    });

    if (existingBrand) {
      return res
        .status(409)
        .json({ success: false, error: "Brand already exists." });
    }

    // Create and save the new brand
    // Your Brand model's 'pre-save' hook should handle slug creation.
    const newBrand = new Brand({ label });
    await newBrand.save();

    // Return the newly created brand document
    res.status(201).json({ success: true, brand: newBrand });
  } catch (error) {
    console.error("API addBrand Error:", error);
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: "A brand with this name or slug already exists.",
      });
    }
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

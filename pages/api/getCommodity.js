import Commodity from "@/models/Commodity";
import connectDB from "@/middleware/conn";
import "@/models/Brands";

export default async function handler(req, res) {
  // A request to get data by slug should be a GET request
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectDB();
    const { slug } = req.query;

    if (!slug) {
      return res.status(400).json({ error: "Slug is required" });
    }

    // 1. Use findOne() to get a single object, not an array.
    const commodity = await Commodity.findOne({ slug: slug })

      // 2. Populate the brand. We select only the 'label' and 'slug' fields.
      // Adjust "label slug" if your Brand model uses different field names.
      .populate("brand", "_id label slug")

      // 3. Populate the nested category fields.
      .populate("category.main", "_id label slug")
      .populate("category.sub", "_id label slug")
      .populate("category.third", "_id label slug");

    // 4. Check if a commodity was found
    if (!commodity) {
      return res.status(404).json({ error: "Product not found" });
    }

    // 5. Send the populated object
    res.status(200).json(commodity);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

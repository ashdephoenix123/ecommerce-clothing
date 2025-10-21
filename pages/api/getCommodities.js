import Commodity from "@/models/Commodity";
import connectDB from "@/middleware/conn";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(400).json({ message: "Method not allowed!" });

  try {
    await connectDB();
    const { categories, brands, colors, fromPrice, toPrice, discount, sortby } =
      req.body;

    const filters = {};
    // filteration logic
    if (categories && categories.length > 0) {
      filters.category = { $in: categories };
    }

    if (colors && colors.length > 0) {
      filters["variants.color"] = { $in: colors };
    }

    if (fromPrice || toPrice) {
      filters["variants.price"] = {};
      if (fromPrice) {
        filters["variants.price"].$gte = parseFloat(fromPrice);
      }
      if (toPrice) {
        filters["variants.price"].$lte = parseFloat(toPrice);
      }
    }

    // const commodities = await Commodity.find(filters);
    const commodities = await Commodity.find();
    res.status(200).json(commodities);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error!" });
  }
}

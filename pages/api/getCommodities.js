import Commodity from "@/models/Commodity";
import connectDB from "@/middleware/conn";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Method not allowed!" });
  }

  try {
    await connectDB();
    const { categories, brands, colors, fromPrice, toPrice, discount, sortby } =
      req.body;

    const filters = {};

    // 1. Category filter
    if (categories && categories.length > 0) {
      filters.category = { $in: categories };
    }

    // 2. Color filter
    if (colors && colors.length > 0) {
      filters["variants.color"] = { $in: colors };
    }

    // 3. Price filter
    if (fromPrice || toPrice) {
      filters["variants.price"] = {};
      if (fromPrice) {
        filters["variants.price"].$gte = Number(fromPrice);
      }
      if (toPrice) {
        filters["variants.price"].$lte = Number(toPrice);
      }
    }

    // --- Query Logic ---
    let commodities; // Declare variable to hold the results

    if (sortby === "recommended") {
      // --- A: Random Sampling via Aggregation ---
      // This pipeline first finds all documents matching the filters,
      // then randomly samples a number of them.
      const pipeline = [
        { $match: filters }, // 1. Apply all our filters
        { $sample: { size: 500 } }, // 2. Randomly select up to 500 docs
      ];
      commodities = await Commodity.aggregate(pipeline);
    } else {
      // --- B: Standard Sorting ---
      const sortOptions = {};

      if (sortby === "whats-new") {
        sortOptions.createdAt = -1; // Newest first
      } else if (sortby === "price-asc") {
        sortOptions["variants.price"] = 1; // Cheapest first
      } else if (sortby === "price-desc") {
        sortOptions["variants.price"] = -1; // Most expensive first
      } else {
        // Default sort (if sortby is empty or unrecognized)
        sortOptions.createdAt = -1;
      }

      commodities = await Commodity.find(filters).sort(sortOptions);
    }

    res.status(200).json(commodities);
  } catch (error) {
    console.error("API Filter Error:", error);
    res.status(500).json({ error: "Internal Server error!" });
  }
}

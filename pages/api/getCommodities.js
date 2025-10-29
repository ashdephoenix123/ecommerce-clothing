import Commodity from "@/models/Commodity";
import connectDB from "@/middleware/conn";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Method not allowed!" });
  }

  try {
    await connectDB();
    const {
      categories,
      brands, // <-- Note: You are destructuring this but not using it in filters
      colors,
      fromPrice,
      toPrice,
      discount, // <-- Note: You are destructuring this but not using it
      sortby,
      page: reqPage, // <-- Get page from request body
      limit: reqLimit, // <-- Get limit from request body
    } = req.body;

    // --- 1. Pagination Setup ---
    // Parse page and limit, providing safe defaults
    const page = parseInt(reqPage) || 1;
    const limit = parseInt(reqLimit) || 12; // Default to 12 items per page
    const skip = (page - 1) * limit;

    // --- 2. Filter Setup ---
    // (This logic is the same as yours)
    const filters = {};

    if (categories && categories.length > 0) {
      filters.category = { $in: categories };
    }
    if (colors && colors.length > 0) {
      filters["variants.color"] = { $in: colors };
    }
    if (fromPrice || toPrice) {
      filters["variants.price"] = {};
      if (fromPrice) {
        filters["variants.price"].$gte = Number(fromPrice);
      }
      if (toPrice) {
        filters["variants.price"].$lte = Number(toPrice);
      }
    }
    // TODO: You could add your 'brands' and 'discount' filters here

    // --- 3. Aggregation Pipeline Setup ---
    // We will build a dynamic pipeline to handle all cases
    const pipeline = [];

    // Stage 1: Match documents based on filters
    pipeline.push({ $match: filters });

    // Stage 2: Apply Sorting or Sampling
    // IMPORTANT: 'sortby' must be handled *before* pagination
    if (sortby === "recommended") {
      // --- A: Random Sampling ---
      // NOTE: Paginating a $sample is "unstable". Each request (Page 1, Page 2)
      // will fetch a *different* random set of 500 documents.
      // This is generally acceptable for a "recommended" feed.
      pipeline.push({ $sample: { size: 500 } });
    } else {
      // --- B: Standard Sorting ---
      const sortOptions = {};
      if (sortby === "whats-new") {
        sortOptions.createdAt = -1;
      } else if (sortby === "price-asc") {
        sortOptions["variants.price"] = 1;
      } else if (sortby === "price-desc") {
        sortOptions["variants.price"] = -1;
        // --- ADD THESE ---
      } else if (sortby === "name-asc") {
        sortOptions.name = 1; // Sort by name ascending
      } else if (sortby === "name-desc") {
        sortOptions.name = -1; // Sort by name descending
      } else if (sortby === "category-asc") {
        sortOptions.category = 1; // Sort by category ascending
      } else if (sortby === "category-desc") {
        sortOptions.category = -1; // Sort by category descending
        // --- END ADD ---
      } else {
        sortOptions.createdAt = -1; // Default
      }
      pipeline.push({ $sort: sortOptions });
    }

    // Stage 3: Apply Pagination and Get Total Count using $facet
    // $facet allows us to run two "sub-pipelines" in parallel:
    // 1. 'metadata': Gets the total count of *all* matched documents
    // 2. 'data': Gets just the documents for the *current page*
    pipeline.push({
      $facet: {
        metadata: [{ $count: "totalCommodities" }],
        data: [{ $skip: skip }, { $limit: limit }],
      },
    });
    // [Image of MongoDB aggregation pipeline with $facet for pagination]

    // --- 4. Execute the Pipeline ---
    const results = await Commodity.aggregate(pipeline);

    // --- 5. Format the Response ---
    // The 'results' array will look like:
    // [ { metadata: [ { totalCommodities: 50 } ], data: [ ...commodities... ] } ]

    const commodities = results[0].data;
    const totalCommodities =
      results[0].metadata.length > 0
        ? results[0].metadata[0].totalCommodities
        : 0;

    const totalPages = Math.ceil(totalCommodities / limit);

    // Send a structured response
    res.status(200).json({
      commodities, // The array of items for the current page
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalCommodities: totalCommodities,
        limit: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("API Filter Error:", error);
    res.status(500).json({ error: "Internal Server error!" });
  }
}

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
      brands, // <-- Now being used!
      colors,
      fromPrice,
      toPrice,
      discount,
      sortby,
      page: reqPage,
      limit: reqLimit,
    } = req.body;

    // --- 1. Pagination Setup ---
    const page = parseInt(reqPage) || 1;
    const limit = parseInt(reqLimit) || 12;
    const skip = (page - 1) * limit;

    // --- 2. Filter Setup (MODIFIED) ---
    const filters = {};

    // --- NEW: Brand Filter ---
    if (brands && brands.length > 0) {
      filters.brand = { $in: brands };
    }

    // --- NEW: Category Filter Logic ---
    // Your old logic `filters.category = ...` will not work.
    // This new logic searches for matching IDs in main, sub, OR third.
    if (categories && categories.length > 0) {
      filters.$or = [
        { "category.main": { $in: categories } },
        { "category.sub": { $in: categories } },
        { "category.third": { $in: categories } },
      ];
    }

    // (These filters are the same and are correct)
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

    // --- 3. Aggregation Pipeline Setup (MODIFIED) ---
    const pipeline = [];

    // Stage 1: Match documents based on filters
    pipeline.push({ $match: filters });

    // --- START: ADDED STAGES TO POPULATE (FILL IN) DATA ---
    //

    // Stage 2: Populate Brand
    pipeline.push({
      $lookup: {
        from: "brands", // <-- ***CHECK THIS COLLECTION NAME***
        localField: "brand",
        foreignField: "_id",
        pipeline: [{ $project: { _id: 1, label: 1, slug: 1 } }], // Only get these fields
        as: "brand",
      },
    });

    // Stage 3: Unwind Brand (turns array into object)
    pipeline.push({
      $unwind: {
        path: "$brand",
        preserveNullAndEmptyArrays: true, // Keep product if brand is missing
      },
    });

    // Stage 4: Populate Cat1 (Main)
    pipeline.push({
      $lookup: {
        from: "cat1", // <-- ***CHECK THIS COLLECTION NAME (e.g., 'cat1' or 'cat1s'?)***
        localField: "category.main",
        foreignField: "_id",
        pipeline: [{ $project: { _id: 1, label: 1, slug: 1 } }],
        as: "category.main",
      },
    });

    // Stage 5: Unwind Cat1 (Main)
    pipeline.push({
      $unwind: {
        path: "$category.main",
        preserveNullAndEmptyArrays: true, // Keep product if category is missing
      },
    });

    // Stage 6: Populate Cat2 (Sub)
    pipeline.push({
      $lookup: {
        from: "cat2", // <-- ***CHECK THIS COLLECTION NAME***
        localField: "category.sub",
        foreignField: "_id",
        pipeline: [{ $project: { _id: 1, label: 1, slug: 1 } }],
        as: "category.sub",
      },
    });

    // Stage 7: Unwind Cat2 (Sub)
    pipeline.push({
      $unwind: {
        path: "$category.sub",
        preserveNullAndEmptyArrays: true, // Keep product if sub-category is missing
      },
    });

    // Stage 8: Populate Cat3 (Third)
    pipeline.push({
      $lookup: {
        from: "cat3", // <-- ***CHECK THIS COLLECTION NAME***
        localField: "category.third",
        foreignField: "_id",
        pipeline: [{ $project: { _id: 1, label: 1, slug: 1 } }],
        as: "category.third",
      },
    });

    // Stage 9: Unwind Cat3 (Third)
    pipeline.push({
      $unwind: {
        path: "$category.third",
        preserveNullAndEmptyArrays: true, // Keep product if third-category is missing
      },
    });

    // --- END: ADDED STAGES ---

    // Stage 10: Apply Sorting or Sampling (MODIFIED)
    if (sortby === "recommended") {
      pipeline.push({ $sample: { size: 500 } });
    } else {
      const sortOptions = {};
      if (sortby === "whats-new") {
        sortOptions.createdAt = -1;
      } else if (sortby === "price-asc") {
        sortOptions["variants.price"] = 1;
      } else if (sortby === "price-desc") {
        sortOptions["variants.price"] = -1;
      } else if (sortby === "name-asc") {
        sortOptions.name = 1;
      } else if (sortby === "name-desc") {
        sortOptions.name = -1;
      }
      // --- MODIFIED SORT ---
      // Your old `sortOptions.category = 1` won't work.
      // This now sorts by the populated 'label' of the main category.
      else if (sortby === "category-asc") {
        sortOptions["category.main.label"] = 1;
      } else if (sortby === "category-desc") {
        sortOptions["category.main.label"] = -1;
      }
      // --- END MODIFIED ---
      else {
        sortOptions.createdAt = -1;
      }
      pipeline.push({ $sort: sortOptions });
    }

    // Stage 11: Apply Pagination and Get Total Count ($facet)
    pipeline.push({
      $facet: {
        metadata: [{ $count: "totalCommodities" }],
        data: [{ $skip: skip }, { $limit: limit }],
      },
    });

    // --- 4. Execute the Pipeline ---
    const results = await Commodity.aggregate(pipeline);

    // --- 5. Format the Response ---
    const commodities = results[0].data;
    const totalCommodities =
      results[0].metadata.length > 0
        ? results[0].metadata[0].totalCommodities
        : 0;

    const totalPages = Math.ceil(totalCommodities / limit);

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

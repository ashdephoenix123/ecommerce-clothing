import Cat2 from "@/models/Cat2";
import Cat3 from "@/models/Cat3";
import connectDB from "@/middleware/conn";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  await connectDB();
  const { method } = req;
  const { cat1id } = req.query; // Get cat1id from query string (e.g., /apiMegaMenu?cat1id=xxx)

  if (method === "GET") {
    if (!cat1id) {
      return res
        .status(400)
        .json({ success: false, error: "cat1id is required in query." });
    }

    try {
      // 1. Find all Cat2 documents matching the Cat1 ID.
      // We sort by 'order', then 'label' to ensure consistent menu order.
      // .lean() makes the query faster and returns plain JS objects, which is perfect here.
      const categories2 = await Cat2.find({ cat1: cat1id })
        .sort({ order: 1, label: 1 })
        .lean();

      // 2. For each Cat2, find its Cat3 children.
      // We use Promise.all to run these queries in parallel for better performance.
      const populatedCategories = await Promise.all(
        categories2.map(async (cat2) => {
          const categories3 = await Cat3.find({ cat2: cat2._id })
            .sort({ order: 1, label: 1 })
            .lean();

          // 3. Attach the Cat3 children as a new 'children' property.
          return {
            ...cat2,
            children: categories3, // Nests Cat3 items under their Cat2 parent
          };
        })
      );

      res.status(200).json({ success: true, data: populatedCategories });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}

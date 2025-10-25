import connectDB from "@/middleware/conn";
import Commodity from "@/models/Commodity";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (req.method === "DELETE") {
      await connectDB();
      const { productIds } = req.body;

      if (
        !productIds ||
        !Array.isArray(productIds) ||
        productIds.length === 0
      ) {
        throw new Error(
          "productIds is required and must be a non-empty array!"
        );
      }

      const deleteResult = await Commodity.deleteMany({
        _id: { $in: productIds },
      });

      if (deleteResult.deletedCount > 0) {
        res.status(200).json({
          success: true,
          message: `Successfully deleted ${deleteResult.deletedCount} commodities.`,
        });
      } else {
        throw new Error("No commodities found with the provided IDs.");
      }
    } else {
      throw new Error("Requested method not allowed!");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

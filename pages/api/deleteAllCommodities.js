import connectDB from "@/middleware/conn";
import Commodity from "@/models/Commodity";

export default async function handler(req, res) {
  try {
    if (req.method === "DELETE") {
      await connectDB();
      const result = await Commodity.deleteMany({});
      res
        .status(200)
        .json({ message: `Deleted ${result.deletedCount} commodities!` });
    } else {
      throw new Error("Requested method not allowed!");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

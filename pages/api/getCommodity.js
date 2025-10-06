import Commodity from "@/models/Commodity";
import connectDB from "@/middleware/conn";

export default async function handler(req, res) {
  await connectDB();
  const commodity = await Commodity.find({ slug: req.query.slug });
  res.status(200).json(commodity);
}

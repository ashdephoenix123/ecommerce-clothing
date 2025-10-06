import Commodity from "@/models/Commodity";
import connectDB from "@/middleware/conn";

export default async function handler(req, res) {
  await connectDB();
  const commodities = await Commodity.find();
  res.status(200).json(commodities);
}

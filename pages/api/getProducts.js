import Commodity from "@/models/Commodity";
import Product from "../../models/Product";
import connectDB from "@/middleware/conn";

export default async function handler(req, res) {
  await connectDB();
  const products = await Product.find({});
  res.status(200).json(products);
}

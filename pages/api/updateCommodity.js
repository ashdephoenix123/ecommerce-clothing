import connectDB from "@/middleware/conn";
import Commodity from "@/models/Commodity";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  try {
    if (req.method === "POST") {
      await connectDB();
      // commodity update logic here
      const { productId, ...rest } = req.body;
      if (!productId) throw new Error("Payload not sufficient!");
      let payload = {};
      if (rest.name) payload.name = rest.name;
      if (rest.description) payload.description = rest.description;
      if (rest.category) payload.category = rest.category;

      if (rest.variants && Array.isArray(rest.variants)) {
        payload.variants = rest.variants;
      }

      const updatedCommodity = await Commodity.findByIdAndUpdate(
        productId,
        { $set: payload },
        { new: true, runValidators: true }
      );

      if (updatedCommodity) {
        res.status(200).json({ success: true, updatedCommodity });
      } else {
        throw new Error("Commodity not found!");
      }
    } else {
      throw new Error("Requested method not allowed!");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

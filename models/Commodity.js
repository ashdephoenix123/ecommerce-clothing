import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema(
  {
    size: { type: String }, // optional for non-size products
    images: [{ type: String }],
    color: { type: String },
    stock: { type: Number, default: 0 },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const CommoditySchema = new mongoose.Schema(
  {
    sku: { type: String, unique: true, sparse: true, index: true },
    slug: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String },
    category: { type: String },
    variants: { type: [VariantSchema], required: true }, // always at least 1
  },
  { timestamps: true }
);

export default mongoose.models.Commodity ||
  mongoose.model("Commodity", CommoditySchema);

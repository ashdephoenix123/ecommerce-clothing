import mongoose from "mongoose";
import { nanoid } from "nanoid";
import slugify from "slugify";

const VariantSchema = new mongoose.Schema({
  size: [{ type: String, default: [] }],
  images: [{ type: String, default: [] }],
  color: { type: String },
  stock: { type: Number, default: 0 },
  price: { type: Number, required: true },
});

const CommoditySchema = new mongoose.Schema(
  {
    sku: { type: String, unique: true, sparse: true, index: true },
    slug: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    description: { type: String },

    /**
     * BRAND FIELD
     * Added an ObjectId reference to the Brand model.
     */
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      index: true,
      sparse: true, // Use sparse if the brand is optional
    },

    category: {
      main: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cat1",
        index: true,
      },
      sub: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cat2",
        index: true,
        sparse: true,
      },
      third: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cat3",
        index: true,
        sparse: true,
      },
    },

    variants: { type: [VariantSchema], required: true },
  },
  { timestamps: true }
);

CommoditySchema.pre("validate", function (next) {
  // 1. Generate the slug from the name
  if (this.isNew || this.isModified("name")) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }

  // 2. Generate a SKU
  if (this.isNew && !this.sku) {
    this.sku = nanoid(10);
  }

  next();
});

export default mongoose.models.Commodity ||
  mongoose.model("Commodity", CommoditySchema);

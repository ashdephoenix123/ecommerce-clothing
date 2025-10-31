import mongoose from "mongoose";
import slugify from "slugify";

const BrandSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    // You could add other brand info here, like a logo URL
    // logo: { type: String },
  },
  { timestamps: true }
);

BrandSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("label")) {
    this.slug = slugify(this.label, {
      lower: true,
      strict: true,
      trim: true,
    });
  }
  next(); // Continue to the save operation
});

export default mongoose.models.Brand || mongoose.model("Brand", BrandSchema);

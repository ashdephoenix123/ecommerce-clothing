import mongoose from "mongoose";
import slugify from "slugify"; // Import the slugify library

const Cat1Schema = new mongoose.Schema(
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
    },
    isEnabled: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

Cat1Schema.pre("save", function (next) {
  if (this.isModified("label")) {
    this.slug = slugify(this.label, {
      lower: true,
      strict: true,
      trim: true,
    });
  }
  next(); // Continue to the save operation
});

export default mongoose.models.Cat1 || mongoose.model("Cat1", Cat1Schema);

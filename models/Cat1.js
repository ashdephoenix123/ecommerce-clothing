import mongoose from "mongoose";

const Cat1Schema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // Added the new isEnabled field
    isEnabled: {
      type: Boolean,
      required: true,
      default: true, // New categories will be enabled by default
    },
  },
  { timestamps: true }
);

export default mongoose.models.Cat1 || mongoose.model("Cat1", Cat1Schema);

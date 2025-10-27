import mongoose from "mongoose";

const Cat3Schema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    cat1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cat1",
      required: true,
    },
    cat2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cat2",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Cat3 || mongoose.model("Cat3", Cat3Schema);

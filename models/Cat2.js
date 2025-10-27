import mongoose from "mongoose";

const Cat2Schema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    cat1: { type: mongoose.Schema.Types.ObjectId, ref: "Cat1", required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Cat2 || mongoose.model("Cat2", Cat2Schema);

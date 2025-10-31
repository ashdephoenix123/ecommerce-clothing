import mongoose from "mongoose";
import slugify from "slugify";

const Cat2Schema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    cat1: { type: mongoose.Schema.Types.ObjectId, ref: "Cat1", required: true },
  },
  { timestamps: true }
);

Cat2Schema.pre("save", async function (next) {
  if (this.isModified("label") || this.isModified("cat1")) {
    try {
      const childSlug = slugify(this.label, {
        lower: true,
        strict: true,
        trim: true,
      });

      const Cat1 = mongoose.model("Cat1");
      const parentCat = await Cat1.findById(this.cat1);

      if (!parentCat) {
        throw new Error("Parent category (Cat1) not found.");
      }

      const parentSlug = parentCat.slug;
      this.slug = `${parentSlug}-${childSlug}`;

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

export default mongoose.models.Cat2 || mongoose.model("Cat2", Cat2Schema);

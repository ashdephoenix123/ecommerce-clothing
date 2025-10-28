import Cat3 from "@/models/Cat3";
import Cat1 from "@/models/Cat1"; // Import for populating and validation
import Cat2 from "@/models/Cat2"; // Import for populating and validation
import connectDB from "@/middleware/conn";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  await connectDB();
  const { method } = req;
  const { id } = req.query; // For PUT and DELETE

  switch (method) {
    case "GET":
      try {
        const { cat2slug } = req.query;

        let filter = {};

        if (cat2slug) {
          const parentCat2 = await Cat2.findOne({ slug: cat2slug });
          if (parentCat2) {
            filter.cat2 = parentCat2._id;
          } else {
            return res.status(200).json({ success: true, data: [] });
          }
        }

        const categories = await Cat3.find(filter)
          .populate("cat1", "label") // Get Cat1 label
          .populate("cat2", ["label", "slug"]) // Get Cat2 label
          .sort({ createdAt: 1 }); // Sort oldest to newest
        res.status(200).json({ success: true, data: categories });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    // POST: Used to create a new Cat3 item
    case "POST":
      try {
        const { label, cat1, cat2 } = req.body; // cat1 and cat2 should be _id's
        if (!label || !cat1 || !cat2) {
          return res.status(400).json({
            success: false,
            error: "Label, cat1 (ID), and cat2 (ID) are required.",
          });
        }

        // Optional: Check if parent IDs exist
        const parentCat1 = await Cat1.findById(cat1);
        const parentCat2 = await Cat2.findById(cat2);

        if (!parentCat1) {
          return res.status(404).json({
            success: false,
            error: "Parent category (Cat1) not found.",
          });
        }
        if (!parentCat2) {
          return res.status(404).json({
            success: false,
            error: "Parent category (Cat2) not found.",
          });
        }

        const category = await Cat3.create({ label, cat1, cat2 });
        res.status(201).json({ success: true, data: category });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    // PUT: Used to update a category (e.g., change its parent cat1 or cat2)
    case "PUT":
      if (!id) {
        return res.status(400).json({
          success: false,
          error: "Category ID is required in query parameters.",
        });
      }
      try {
        // req.body can be { cat1: "newId" } or { cat2: "newId" }
        const category = await Cat3.findByIdAndUpdate(id, req.body, {
          new: true, // Return the updated document
          runValidators: true,
        });
        if (!category) {
          return res
            .status(404)
            .json({ success: false, error: "Category not found." });
        }
        res.status(200).json({ success: true, data: category });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    // DELETE: Used to delete a category
    case "DELETE":
      if (!id) {
        return res.status(400).json({
          success: false,
          error: "Category ID is required in query parameters.",
        });
      }
      try {
        // No safety check needed here, as nothing depends on Cat3 (yet)
        const deletedCategory = await Cat3.findByIdAndDelete(id);
        if (!deletedCategory) {
          return res
            .status(404)
            .json({ success: false, error: "Category not found." });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]); // Added PUT/DELETE
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}

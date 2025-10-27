import Cat2 from "@/models/Cat2";
import Cat1 from "@/models/Cat1"; // Import Cat1 to populate
import Cat3 from "@/models/Cat3"; // Import Cat3 for delete safety check
import connectDB from "@/middleware/conn";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  await connectDB();
  const { method } = req;
  const { id } = req.query; // For PUT and DELETE

  switch (method) {
    // GET: Used to fetch all Cat2 items
    case "GET":
      try {
        const categories = await Cat2.find({})
          .populate("cat1", "label") // "label" limits it to only returning the label field and _id
          .sort({ createdAt: 1 }); // Sort oldest to newest
        res.status(200).json({ success: true, data: categories });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    // POST: Used to create a new Cat2 item
    case "POST":
      try {
        const { label, cat1 } = req.body; // cat1 should be the _id from Cat1
        if (!label || !cat1) {
          return res.status(400).json({
            success: false,
            error: "Label and cat1 (ID) are required.",
          });
        }

        const parentCat = await Cat1.findById(cat1);
        if (!parentCat) {
          return res.status(404).json({
            success: false,
            error: "Parent category (Cat1) not found.",
          });
        }

        const category = await Cat2.create({ label, cat1 });
        res.status(201).json({ success: true, data: category });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    // PUT: Used to update a category (e.g., change its parent cat1)
    case "PUT":
      if (!id) {
        return res.status(400).json({
          success: false,
          error: "Category ID is required in query parameters.",
        });
      }
      try {
        // req.body will be { cat1: "newId" } from the component
        const category = await Cat2.findByIdAndUpdate(id, req.body, {
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
        // --- SAFETY CHECK ---
        // Check if any Cat3 item is using this Cat2 item
        const childCat = await Cat3.findOne({ cat2: id });
        if (childCat) {
          return res.status(400).json({
            success: false,
            error: `Cannot delete. This category is being used by a Cat3 item ('${childCat.label}').`,
          });
        }

        const deletedCategory = await Cat2.findByIdAndDelete(id);
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

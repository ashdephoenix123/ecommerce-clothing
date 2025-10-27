import Cat1 from "@/models/Cat1";
import connectDB from "@/middleware/conn"; // Using your connection middleware

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  await connectDB();
  const { method } = req;

  switch (method) {
    // GET: Used to fetch all Cat1 items for a dropdown
    case "GET":
      try {
        const categories = await Cat1.find({}).sort({ createdAt: 1 });
        res.status(200).json({ success: true, data: categories });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    // POST: Used to create a new Cat1 item
    case "POST":
      try {
        const { label } = req.body;
        if (!label) {
          return res
            .status(400)
            .json({ success: false, error: "Label is required." });
        }
        // The 'isEnabled' field will be set to 'true' by default
        // based on the Mongoose model you provided.
        const category = await Cat1.create({ label });
        res.status(201).json({ success: true, data: category });
      } catch (error) {
        // Handle duplicate label error
        if (error.code === 11000) {
          return res
            .status(400)
            .json({ success: false, error: "This label already exists." });
        }
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    // PUT: Used to update the 'isEnabled' status
    case "PUT":
      try {
        const { id } = req.query; // Get ID from query: /api/cat1?id=...
        const { isEnabled } = req.body;

        if (!id) {
          return res.status(400).json({
            success: false,
            error: "Category ID is required in query.",
          });
        }
        if (typeof isEnabled !== "boolean") {
          return res.status(400).json({
            success: false,
            error: "'isEnabled' (as a boolean) is required in body.",
          });
        }

        const updatedCategory = await Cat1.findByIdAndUpdate(
          id,
          { isEnabled: isEnabled },
          { new: true, runValidators: true } // 'new: true' returns the updated document
        );

        if (!updatedCategory) {
          return res
            .status(404)
            .json({ success: false, error: "Category not found." });
        }

        res.status(200).json({ success: true, data: updatedCategory });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    // DELETE: Used to delete a Cat1 item
    case "DELETE":
      try {
        const { id } = req.query; // Get ID from query: /api/cat1?id=...

        if (!id) {
          return res.status(400).json({
            success: false,
            error: "Category ID is required in query.",
          });
        }

        const deletedCategory = await Cat1.findByIdAndDelete(id);

        if (!deletedCategory) {
          return res
            .status(404)
            .json({ success: false, error: "Category not found." });
        }

        res
          .status(200)
          .json({ success: true, message: "Category deleted successfully." });
      } catch (error) {
        // Handle potential errors, e.g., related data constraints
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]); // Added DELETE
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}

import connectDB from "@/middleware/conn";
import Brands from "@/models/Brands";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  // We only want to allow GET requests for this endpoint
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, error: "Method Not Allowed" });
  }

  try {
    await connectDB();

    // Fetch all brands from the database
    // We select only 'label' and '_id' (which is included by default)
    // as that is all the frontend Autocomplete needs.
    // .sort({ label: 1 }) ensures the list is alphabetical.
    const brands = await Brands.find({}).sort({ label: 1 }).select("label");

    res.status(200).json({ success: true, brands: brands });
  } catch (error) {
    console.error("API getBrands Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

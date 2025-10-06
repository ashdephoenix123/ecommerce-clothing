import formidable from "formidable";
import fs from "fs";
import csv from "csv-parser";
import connectDB from "@/middleware/conn";
import Commodity from "@/models/Commodity";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await connectDB();

  const form = formidable({ multiples: false, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "File parsing failed" });
    }

    try {
      const file = Array.isArray(files.csvFile)
        ? files.csvFile[0]
        : files.csvFile;

      if (!file || !file.filepath) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const results = [];
      await new Promise((resolve, reject) => {
        fs.createReadStream(file.filepath)
          .pipe(csv())
          .on("data", (row) => results.push(row))
          .on("end", resolve)
          .on("error", reject);
      });

      // 🔹 Transform CSV rows into schema-compliant objects
      const docs = results.map((row) => {
        return {
          sku: row.sku,
          slug: row.slug,
          name: row.name,
          description: row.description,
          category: row.category || "",
          variants: row.variants ? JSON.parse(row.variants) : [],
        };
      });

      if (docs.length > 0) {
        await Commodity.insertMany(docs);
      }

      res.status(200).json({ inserted: docs.length });
    } catch (e) {
      console.error("Upload error:", e);
      res.status(500).json({ error: e.message });
    }
  });
}

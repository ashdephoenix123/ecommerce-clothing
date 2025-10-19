import pincode from "../pincode.json";
export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const areaPincode = req.body.areaPincode;
      const findArea = pincode[areaPincode];
      const area = { [areaPincode]: [findArea.state, findArea.city] };
      if (findArea) {
        res.status(200).json(area);
      } else {
        throw new Error("Area not found!");
      }
    } else {
      throw new Error("Method not allowed!");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

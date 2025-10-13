var crypto = require("crypto");
import connectDB from "@/middleware/conn";
import Commodity from "@/models/Commodity";
import Order from "../../models/Order";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      let body =
        req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEYSECRET)
        .update(body.toString())
        .digest("hex");
      if (expectedSignature === req.body.razorpay_signature) {
        await connectDB();
        const check = await Order.findOneAndUpdate(
          { orderID: req.body.razorpay_order_id },
          {
            status: "Paid",
            paymentInfo: req.body,
            paymentID: req.body.razorpay_payment_id,
          }
        );
        // console.log(check);
        // Object.keys(check.products).map(async (item) => {
        //   await Commodity.findOneAndUpdate(
        //     { sku: item.split(" ")[-1] },
        //     { $inc: { availableQty: -check.products[item].quantity } }
        //   );
        // });
      }
      console.log(1);
      // res.redirect(`/order?id=${req.body.razorpay_order_id}&clearCart=true`);
      res.status(200).json({ success: true });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

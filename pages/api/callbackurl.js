var crypto = require("crypto");
import connectDB from "@/middleware/conn";
import Commodity from "@/models/Commodity";
import Order from "../../models/Order";
import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";
import { sender } from "@/constants/globals";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      let body =
        req.body.response.razorpay_order_id +
        "|" +
        req.body.response.razorpay_payment_id;

      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEYSECRET)
        .update(body.toString())
        .digest("hex");
      if (expectedSignature === req.body.response.razorpay_signature) {
        await connectDB();
        const check = await Order.findOneAndUpdate(
          { orderID: req.body.response.razorpay_order_id },
          {
            status: "Paid",
            paymentInfo: req.body.response,
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
      // res.redirect(`/order?id=${req.body.razorpay_order_id}&clearCart=true`);

      let emailAPI = new TransactionalEmailsApi();
      emailAPI.authentications.apiKey.apiKey = process.env.BREVO_API;
      let message = new SendSmtpEmail();
      message.templateId = 3;
      message.params = {
        name: req.body.name,
        orderNo: req.body.orderID,
        date: new Date().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        deliveryAddress: req.body.address,
      };

      message.sender = {
        name: sender.name,
        email: sender.email,
      };
      message.to = [{ email: req.body.email, name: req.body.name }];
      emailAPI
        .sendTransacEmail(message)
        .then((res) => {
          console.log(JSON.stringify(res.body));
        })
        .catch((err) => {
          console.error("Error sending email:", err.body);
        });
      res.status(200).json({ success: true });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

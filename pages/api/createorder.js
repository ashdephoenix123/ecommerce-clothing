const Razorpay = require("razorpay");
import connectDB from "@/middleware/conn";
import Order from "../../models/Order";
import Product from "@/models/Product";
import pincode from "../pincode.json";
import Commodity from "@/models/Commodity";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      if (!Object.keys(pincode).includes(req.body.pincode)) {
        throw new Error("The Pincode you have entered is not serviceable.");
      }

      await connectDB();
      //check tampering cart
      const { cart } = req.body;
      let sumtotal = 0;
      for (let item in cart) {
        const itemid = item.split(" ")[0];
        const productInDB = await Commodity.findOne({
          slug: "leather-handbag",
        }); //itemid
        console.log(itemid);
        console.log(productInDB, "\nproductInDB");
        if (!productInDB) throw new Error("Product Not found!");
        sumtotal += cart[item].price * cart[item].quantity;
        // if (cart[item].quantity > productInDB.availableQty) {
        //   throw new Error(
        //     "Some Items in your cart is Out of Stock. Please try again later."
        //   );
        // }
        // if (cart[item].price !== productInDB.price) {
        //   throw new Error(
        //     "The Price of some items in your cart have changed. Please try again later."
        //   );
        // }
      }
      if (sumtotal !== req.body.subtotal) {
        throw new Error(
          "The Price of some items in your cart have changed. Please try again later."
        );
      }
      if (req.body.subtotal <= 0) {
        throw new Error(
          "Your Cart is Empty. Please build your cart and try again."
        );
      }
      //   if (req.body.phone.length !== 10) {
      //     throw new Error("Please enter your 10 digit Mobile number.");
      //   }

      if (req.body.pincode.length !== 6) {
        throw new Error("Please enter a valid Area Pincode.");
      }

      let instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEYID,
        key_secret: process.env.RAZORPAY_KEYSECRET,
      });

      const resp = await instance.orders.create({
        amount: req.body.subtotal * 100,
        currency: "INR",
        receipt: `Receipt: #${Math.floor(Date.now() * Math.random())}`,
      });

      const order = new Order({
        email: req.body.email,
        orderID: resp.id,
        address: `${req.body.address}, ${req.body.city}, ${req.body.state}, ${req.body.pincode}`,
        phone: req.body.phone,
        name: req.body.name,
        amount: req.body.subtotal,
        products: req.body.cart,
      });

      await order.save();
      res.status(200).json(resp);
    } else {
      throw new Error("This method is not allowed.");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

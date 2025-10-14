import React, { useEffect } from "react";
import connectDB from "@/middleware/conn";
import Order from "@/models/Order";
import Link from "next/link";
import { useRouter } from "next/router";

const MyOrder = ({ order, clearCart }) => {
  const { products } = order;
  const router = useRouter();
  useEffect(() => {
    if (router.query.clearCart === "true") {
      clearCart();
    }
  }, []);
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden py-16">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap items-center">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h1 className="text-4xl title-font tracking-wider mb-6">
                {order.status === "Paid"
                  ? "Thank You for shopping with us!"
                  : "Uh oh! Your Order is not confirmed!"}
              </h1>
              <h2 className="text-md title-font text-gray-500 tracking-widest">
                The Sharkk Co.
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                Order ID: #{order.orderID}
              </h1>

              <p className="leading-relaxed mb-4">
                Order created on{" "}
                <span className="text-slate-700 font-semibold">
                  {new Date(order.createdAt).toLocaleString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
              <p className="leading-relaxed mb-4">
                {order.status === "Paid" &&
                  "Your Order has been successfully placed. "}
                Your Payment status is{" "}
                <span className="text-slate-700 font-semibold">{`"${order.status}"`}</span>
              </p>
              <div className="flex mb-4">
                <a className="flex-grow border-b-2 border-gray-300 py-2 font-semibold">
                  Item Description
                </a>
                <a className="flex-grow border-b-2 border-gray-300 py-2 font-semibold">
                  Color
                </a>
                <a className="flex-grow border-b-2 border-gray-300 py-2 font-semibold">
                  Size
                </a>
                <a className="flex-grow border-b-2 border-gray-300 py-2 font-semibold">
                  Quantity
                </a>
                <a className="flex-grow border-b-2 border-gray-300 py-2 font-semibold">
                  Price
                </a>
              </div>
              {Object.keys(products).map((product, index) => {
                return (
                  <div key={index} className="flex border-gray-200 py-2">
                    <span className="text-gray-500 flex-grow hover:underline">
                      <Link href={`/products/${product}`}>
                        {products[product].name}
                      </Link>
                    </span>
                    <span className="flex-grow text-gray-900">
                      {products[product].variant}
                    </span>
                    <span className="flex-grow text-gray-900">
                      {products[product].size}
                    </span>
                    <span className="flex-grow text-gray-900">
                      {products[product].quantity}
                    </span>
                    <span className="flex-grow text-gray-900">
                      ₹{products[product].price}
                    </span>
                  </div>
                );
              })}

              <div className="flex mt-10 items-center">
                <span className="title-font font-medium text-2xl text-gray-900">
                  Subtotal: ₹{order.amount}
                </span>
                <button className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">
                  <Link href="/">Continue Shopping</Link>
                </button>
                {order.status === "Paid" && (
                  <button className="flex ml-2 text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">
                    Track Order
                  </button>
                )}
              </div>
            </div>
            {order.status === "Paid" ? (
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full lg:h-auto object-contain object-center rounded"
                src="/order-confirmed.png"
              />
            ) : (
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full lg:h-auto object-contain object-center rounded"
                src="/oops.png"
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  await connectDB();
  const order = await Order.findOne({ orderID: context.query.id });

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
}

export default MyOrder;

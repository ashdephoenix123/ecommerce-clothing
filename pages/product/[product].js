import api from "@/axios/instance";
import connectDB from "@/middleware/conn";
import styles from "@/styles/product.module.scss";
import { getAreaPincode } from "@/utils/helpers";
import Error from "next/error";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = ({ addToCart, buyNow, productdetails, error }) => {
  let defaultVariant = productdetails.variants[0];
  const router = useRouter();
  const [pincode, setPincode] = useState("");
  const [size, setSize] = useState(defaultVariant.size[0]);
  const [variant, setVariant] = useState(defaultVariant);

  let prodid =
    productdetails._id +
    " " +
    productdetails.name +
    " " +
    size +
    " " +
    variant.color +
    " " +
    productdetails.sku;

  useEffect(() => {
    if (!error) {
      setVariant(defaultVariant);
      defaultVariant.size.length > 0 && setSize(defaultVariant.size[0]);
    }
  }, [router.query, defaultVariant, error]);

  const updatePincode = (e) => {
    const { value } = e.target;
    setPincode(value.slice(0, 6));
  };

  const checkService = async () => {
    if (!pincode || pincode.length < 6) {
      return toast.error("Please enter a valid pincode.", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    const areaDetails = await getAreaPincode(pincode);
    if (areaDetails.success) {
      toast.success("Yay! This Pincode is serviceable.", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Sorry! This Pincode is currently unserviceable.", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const refreshVariant = (newVariant) => {
    setVariant(newVariant);
    setSize(newVariant.size[0]);
  };

  const refreshSizeVariant = (val) => {
    setSize(val);
  };

  const addProductToCart = () => {
    addToCart(
      prodid,
      1,
      variant.price,
      productdetails.name,
      size,
      variant.color
    );
    toast.success("Added to cart!");
  };

  const buyInstant = () => {
    buyNow(prodid, 1, variant.price, productdetails.name, size, variant.color);
    router.push("/checkout");
  };

  if (error) {
    return <Error statusCode={error} />;
  }

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className={`lg:w-1/2 w-full h-3/4 sm:w-1/2 object-cover object-top rounded ${styles.fixImage}`}
              src={variant.images[0]}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 relative">
              <h2 className="text-md title-font text-gray-500 tracking-widest capitalize">
                {productdetails.category.third.label}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {productdetails.name}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{productdetails.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex items-center">
                  <span className="mr-3">Color</span>
                  {productdetails.variants.map((individualVariant, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          refreshVariant(individualVariant);
                        }}
                        className={`border ml-1 rounded-full w-8 h-8 focus:outline-none ${
                          individualVariant.color === variant.color
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: individualVariant.color }}
                      ></button>
                    );
                  })}
                </div>
                {variant?.size.length > 0 && (
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Size</span>
                    <div className="relative">
                      <select
                        value={size}
                        onChange={(e) => {
                          refreshSizeVariant(e.target.value);
                        }}
                        className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 text-xl pl-3 pr-10"
                      >
                        {variant.size.map((siz) => (
                          <option key={siz} value={siz}>
                            {siz}
                          </option>
                        ))}
                      </select>
                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <span className="title-font font-medium text-2xl text-gray-900">
                  {variant.stock !== 0 ? (
                    "₹" + variant.price
                  ) : (
                    <span className="text-red-700 font-semibold">
                      Out of Stock
                    </span>
                  )}
                </span>
                <button
                  onClick={addProductToCart}
                  disabled={variant.stock === 0}
                  className="disabled:bg-green-300 flex ml-10 text-white bg-green-500 border-0 py-2 px-6 hover:bg-green-600 focus:outline-none rounded"
                >
                  {" "}
                  <BsFillBagFill className="mr-3" size={20} /> Add To Cart
                </button>
                <button
                  disabled={variant.stock === 0}
                  onClick={buyInstant}
                  className="flex ml-5 text-white bg-green-500 border-0 py-2 px-6 hover:bg-green-600 disabled:bg-green-300 focus:outline-none rounded"
                >
                  Buy Now
                </button>
              </div>
              <div className="flex items-center mt-5">
                <input
                  type="number"
                  className="p-2 border-2 border-stone-300 rounded-md"
                  placeholder="Enter Pincode"
                  name="pincode"
                  value={pincode}
                  onChange={updatePincode}
                />
                <button
                  className="flex ml-2 text-white bg-green-500 border-0 py-3 px-6 focus:outline-none hover:bg-green-600 rounded"
                  onClick={checkService}
                >
                  {" "}
                  Check
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    await connectDB();
    const slug = context.query.product;
    const productdetails = await api.get(`/getCommodity?slug=${slug}`);

    return {
      props: {
        productdetails: productdetails.data || null,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "Something went wrong!",
      },
    };
  }
}

export default Product;

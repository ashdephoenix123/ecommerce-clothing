import React, { useEffect, useState } from "react";
import { HiPlusCircle, HiMinusCircle } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import Head from "next/head";
import Script from "next/script";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/router";

const Checkout = ({
  usertoken,
  cart,
  addToCart,
  updateCartItem,
  clearCart,
  removeItem,
  subtotal,
}) => {
  const router = useRouter();
  const [address, setAddress] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    pincode: "",
    state: "",
    city: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [verified, setVerified] = useState(true);

  function onChange() {
    setVerified(false);
  }

  const getPincode = async (value) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    const data = await response.json();
    if (Object.keys(data).includes(value)) {
      setAddress((prev) => {
        return {
          ...prev,
          state: data[value][1],
          city: data[value][0],
        };
      });
    } else {
      setAddress((prev) => {
        return {
          ...prev,
          state: "",
          city: "",
        };
      });
    }
  };

  const updateAddress = async (e) => {
    const { name, value } = e.target;

    if (name === "pincode" && value.length === 6) {
      getPincode(value);
    }

    setAddress((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const getUser = async (token) => {
    const res = await fetch(`/api/getUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    if (data.found) {
      setAddress((prev) => {
        return {
          ...prev,
          name: data.name,
          email: data.email,
          address: data.address,
          pincode: data.pincode,
          phone: data.phone,
        };
      });
      getPincode(data.pincode);
    } else {
      toast.error("Something went wrong, Please logout and try again.", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      //Log user out
      localStorage.clear();
      window.location = "/";
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    if (token) {
      getUser(token);
    }
  }, []);
  useEffect(() => {
    if (
      address.name.length !== 0 &&
      address.email.length !== 0 &&
      address.address.length !== 0 &&
      address.phone.length !== 0 &&
      address.pincode.length === 6
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [address]);

  let orderID;
  const initiatePayment = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/createorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subtotal,
        email: address.email,
        name: address.name,
        address: address.address,
        cart,
        phone: address.phone,
        pincode: address.pincode,
        city: address.city,
        state: address.state,
      }),
    });
    const data = await res.json();
    if (data.status === "created") {
      orderID = data.id;
      var options = {
        key: "rzp_test_RSrQvYYBKxtjcS", // Enter the Key ID generated from the Dashboard
        // key: process.env.RAZORPAY_KEYID, // Enter the Key ID generated from the Dashboard
        amount: subtotal * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Sharkk & Co.",
        description: "Test Transaction",
        image: "/fav.png",
        order_id: orderID,
        // callback_url: `${process.env.NEXT_PUBLIC_HOST}/orders`,
        // callback_url: `${process.env.NEXT_PUBLIC_HOST}/api/callbackurl`,
        handler: async (response) => {
          const resp = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/api/callbackurl`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(response),
            }
          );

          console.log(resp);
          if (resp.status) {
            router.replace(
              `/order?id=${response.razorpay_order_id}&clearCart=true`
            );
          }
        },
        prefill: {
          name: address.name,
          email: address.email,
          contact: address.phone,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#00790F",
        },
      };

      var rzp1 = new Razorpay(options);
      rzp1.open();
    } else {
      // clearCart();
      toast.error(data.error, {
        position: "top-left",
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
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      {/* <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_STAGING_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}  crossorigin="anonymous" /> */}
      <div className="container">
        <ToastContainer
          position="top-left"
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
        <section className="text-gray-600 ">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="font-bold text-6xl text-center my-4">Checkout</h1>
            </div>
            <div className="mx-auto">
              <h2 className="font-semibold text-3xl mb-5">
                1. Delivery Details
              </h2>
              <div className="flex flex-wrap -m-2">
                <div className="p-2 sm:w-1/2 w-full">
                  <div className="">
                    <label
                      htmlFor="name"
                      className="leading-7 text-md text-gray-600"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={address.name}
                      onChange={updateAddress}
                      className="w-full text-2xl mt-1 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none text-gray-700 py-3 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 sm:w-1/2 w-full">
                  <div className="">
                    <label
                      htmlFor="email"
                      className="leading-7 text-md text-gray-600"
                    >
                      Email
                    </label>
                    {usertoken.value !== null ? (
                      <input
                        type="email"
                        readOnly={true}
                        id="email"
                        name="email"
                        value={address.email}
                        className="w-full text-2xl mt-1 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none text-gray-700 py-3 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    ) : (
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={address.email}
                        onChange={updateAddress}
                        className="w-full text-2xl mt-1 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none text-gray-700 py-3 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    )}
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="">
                    <label
                      htmlFor="address"
                      className="leading-7 text-md text-gray-600"
                    >
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={address.address}
                      onChange={updateAddress}
                      rows={5}
                      className="w-full text-2xl mt-1 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none text-gray-700 py-3 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    ></textarea>
                  </div>
                </div>
                <div className="p-2 sm:w-1/2 w-full">
                  <div className="">
                    <label
                      htmlFor="phone"
                      className="leading-7 text-md text-gray-600"
                    >
                      Phone
                    </label>
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      maxLength={10}
                      value={address.phone}
                      onChange={updateAddress}
                      placeholder="Enter 10 digit phone number"
                      className="w-full text-2xl mt-1 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none text-gray-700 py-3 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 sm:w-1/2 w-full">
                  <div className="">
                    <label
                      htmlFor="pincode"
                      className="leading-7 text-md text-gray-600"
                    >
                      Pincode
                    </label>
                    <input
                      type="number"
                      id="pincode"
                      name="pincode"
                      maxLength={6}
                      value={address.pincode}
                      onChange={updateAddress}
                      className="w-full text-2xl mt-1 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none text-gray-700 py-3 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 sm:w-1/2 w-full">
                  <div className="">
                    <label
                      htmlFor="city"
                      className="leading-7 text-md text-gray-600"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={address.city}
                      onChange={updateAddress}
                      readOnly={true}
                      className="w-full text-2xl mt-1 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none text-gray-700 py-3 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 sm:w-1/2 w-full">
                  <div className="">
                    <label
                      htmlFor="state"
                      className="leading-7 text-md text-gray-600"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={address.state}
                      onChange={updateAddress}
                      readOnly={true}
                      className="w-full text-2xl mt-1 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none text-gray-700 py-3 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto my-16">
              <h2 className="font-semibold text-3xl mb-4">
                2. Review Cart Items and Pay
              </h2>
              <div className="py-6 w-full">
                <div className="w-full text-2xl bg-opacity-50 rounded border border-gray-300  outline-none bg-green-400 text-gray-700 py-8 px-6 leading-8 transition-colors duration-200 ease-in-out">
                  <ol className="mb-4">
                    {Object.keys(cart).length === 0 && (
                      <li className="text-2xl p-0 m-0">Your Cart is Empty!</li>
                    )}
                    {Object.keys(cart).map((item, index) => {
                      return (
                        <li key={item} className="flex justify-between mb-6">
                          {index + 1 + ". " + cart[item].name}
                          <div className="flex">
                            <HiMinusCircle
                              className="mr-6 cursor-pointer"
                              onClick={() => {
                                updateCartItem(
                                  item,
                                  cart[item].quantity,
                                  cart[item].price,
                                  cart[item].name,
                                  cart[item].size,
                                  cart[item].variant
                                );
                              }}
                              size={20}
                            />
                            <span>{cart[item].quantity}</span>
                            <HiPlusCircle
                              className="ml-6 cursor-pointer"
                              onClick={() => {
                                addToCart(
                                  item,
                                  cart[item].quantity,
                                  cart[item].price,
                                  cart[item].name,
                                  cart[item].size,
                                  cart[item].variant
                                );
                              }}
                              size={20}
                            />
                            <MdDelete
                              className="ml-6 cursor-pointer"
                              onClick={() => {
                                removeItem(item);
                              }}
                              size={20}
                            />
                          </div>
                        </li>
                      );
                    })}
                    <div className="mt-4">Total: ₹{subtotal}</div>
                  </ol>
                </div>
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_GOOGLE_SITE_KEY}
                  type="image"
                  onChange={onChange}
                />
                <button
                  disabled={disabled || verified}
                  onClick={initiatePayment}
                  className="disabled:bg-green-300 mt-6 px-6 py-4 text-white bg-green-500 rounded hover:bg-green-600"
                >
                  Pay ₹{subtotal}{" "}
                </button>
                <div className="mt-6 text-center">
                  Use{" "}
                  <span className="bg-green-500 px-2 text-white -skew-x-6 inline-block">
                    success@razorpay
                  </span>{" "}
                  for successful transaction.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Checkout;

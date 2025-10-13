import React, { useEffect, useState } from "react";
import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";
import Script from "next/script";

const Signup = () => {
  const router = useRouter();

  const [verified, setVerified] = useState(true);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  function onChange(value) {
    console.log("Captcha value:", value);
    setVerified(false);
  }

  const updateUser = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitUser = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/usersignup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();

    if (data.success) {
      toast.success("User have been registered successfully!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setUser({
        name: "",
        email: "",
        password: "",
      });
    } else {
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

  useEffect(() => {
    if (localStorage.getItem("usertoken")) {
      router.push("/");
    }
  }, []);

  return (
    <>
      {/* <Script src="https://www.google.com/recaptcha/api.js" /> */}
      <div className="flex min-h-full items-center justify-center px-4 py-16 sm:px-6 lg:px-8 my-2">
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
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="/fav.png"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create a new account
            </h2>
          </div>
          <form className="mt-8 space-y-6" method="POST" onSubmit={submitUser}>
            <input type="hidden" name="remember" value="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={updateUser}
                  type="text"
                  className="focus:outline-none relative block w-full rounded-t-md border-0 py-4 px-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-md sm:leading-6"
                  placeholder="Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={updateUser}
                  type="email"
                  className="focus:outline-none relative block w-full  py-4 px-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-md sm:leading-6"
                  placeholder="Email address"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={updateUser}
                  type="password"
                  className="focus:outline-none relative block w-full rounded-b-md  py-4 px-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-md sm:leading-6"
                  placeholder="Password"
                  required
                />
              </div>
              {/* <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input id="password" name="password" type="password" autoComplete="current-password" required className="focus:outline-none relative block w-full  py-4 px-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-md sm:leading-6" placeholder="Password" />
              </div> */}
              {/* <div>
                <label htmlFor="cpassword" className="sr-only">Password</label>
                <input id="cpassword" name="cpassword" type="password" autoComplete="current-password" required className="focus:outline-none relative block w-full rounded-b-md border-0 py-4 px-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-md sm:leading-6" placeholder="Confirm Password" />
              </div> */}
            </div>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_GOOGLE_SITE_KEY}
              type="image"
              onChange={onChange}
            />

            <div>
              <button
                disabled={verified}
                type="submit"
                className="disabled:bg-green-300 group relative flex w-full justify-center rounded-md bg-green-600 py-4 px-2  text-md font-semibold text-white hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Create new account
              </button>
            </div>
            <div className="relative flex items-center w-full">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-4 text-gray-400">Or</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="mx-2 block text-md text-gray-900">
                Already have an account?
              </div>
              <Link
                href="/login"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";
import Script from "next/script";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [verified, setVerified] = useState(true);

  const updateUser = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  function onChange(value) {
    console.log("Captcha value:", value);
    setVerified(false);
  }
  const submitUser = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/userlogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();

    if (data.success) {
      localStorage.setItem("usertoken", data.token);
      toast.success("User logged In successfully!", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setUser({
        email: "",
        password: "",
      });

      router.push("/");
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
              Log In to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={submitUser} method="POST">
            {/* <input type="hidden" name="remember" value="true" /> */}
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  value={user.email}
                  onChange={updateUser}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="focus:outline-none relative block w-full rounded-t-md border-0 py-4 px-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-md sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  value={user.password}
                  onChange={updateUser}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="focus:outline-none relative block w-full rounded-b-md border-0 py-4 px-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-md sm:leading-6"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              {/* <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className=" h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600" />
                <label htmlFor="remember-me" className="ml-2 block text-md text-gray-900">Remember me</label>
              </div> */}

              <div className="text-md">
                <Link
                  href="/forgot"
                  className="font-medium text-green-600 hover:text-green-500 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_GOOGLE_SITE_KEY}
                type="image"
                onChange={onChange}
              />
              <button
                disabled={verified}
                type="submit"
                className="mt-2 group relative flex w-full justify-center rounded-md bg-green-600 py-4 px-2  text-md font-semibold text-white hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:bg-green-300"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Log In
              </button>
            </div>
            <div className="relative flex items-center w-full">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-4 text-gray-400">Or</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="mx-2 block text-md text-gray-900">New User?</div>
              <Link
                href="/signup"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

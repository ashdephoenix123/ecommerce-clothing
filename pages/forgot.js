import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Forgot = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState({
    password: "",
    cpassword: "",
  });

  const updateEmail = async (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const updatePassword = (e) => {
    const { name, value } = e.target;
    setNewPassword((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const changePassinDB = async () => {
    if (!newPassword.password) {
      toast.error("Password field cannot be Empty!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (newPassword.password !== newPassword.cpassword) {
      toast.error("Password and Confirm password did not match!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (newPassword.password.length < 8) {
      toast.error("Password length shouold be 8 characters or long!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const res = await fetch("/api/updatePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newpassword: newPassword.password,
          token: router.query.id,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Password has been updated!", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setNewPassword({
          password: "",
          cpassword: "",
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
    }
  };

  const sendEmail = async () => {
    const res = await fetch("/api/forgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.success) {
      toast.success(
        "Password Reset instructions have been sent to your email.",
        {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      setEmail("");
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
      <div className="flex min-h-full items-center justify-center px-4 py-16 sm:px-6 lg:px-8 my-16">
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
              Forgot Password
            </h2>
          </div>
          {!router.query.id && (
            <>
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    value={email}
                    onChange={updateEmail}
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="focus:outline-none relative block w-full  py-4 px-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-md sm:leading-6"
                    placeholder="Enter Email address"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={sendEmail}
                  className="group relative flex w-full justify-center rounded-md bg-green-600 py-4 px-2  text-md font-semibold text-white hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Continue
                </button>
              </div>
            </>
          )}
          {router.query.id && (
            <>
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="password" className="sr-only">
                    Set New Password
                  </label>
                  <input
                    value={newPassword.password}
                    onChange={updatePassword}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Set New Password"
                    required
                    className="focus:outline-none relative block w-full  py-4 px-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-md sm:leading-6"
                  />
                </div>
                <div>
                  <label htmlFor="cpassword" className="sr-only">
                    Confirm New Password
                  </label>
                  <input
                    value={newPassword.cpassword}
                    onChange={updatePassword}
                    id="cpassword"
                    name="cpassword"
                    type="password"
                    required
                    placeholder="Confirm New Password"
                    className="focus:outline-none relative block w-full  py-4 px-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-md sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={changePassinDB}
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md bg-green-600 py-4 px-2  text-md font-semibold text-white hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Change Password
                </button>
              </div>
            </>
          )}
          <div className="relative flex items-center w-full">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">Or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="flex items-center justify-center">
            <div className="mx-2 block text-md text-gray-900"> Go back to</div>
            <Link
              href="/login"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Log In
            </Link>
            <div className="mx-2 block text-md text-gray-900">page</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgot;

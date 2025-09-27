import "@/styles/globals.scss";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopMargin from "@/components/TopMargin";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [cart, setCart] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [usertoken, setUsertoken] = useState({ value: null });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(20);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });

    try {
      const savedCart = JSON.parse(localStorage.getItem("cart"));
      if (savedCart) {
        setCart(savedCart);
        saveCart(savedCart);
      }
      const token = localStorage.getItem("usertoken");
      if (token) {
        setUsertoken({ value: token });
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  }, [router.query]);

  const saveCart = (myCart) => {
    let subt = 0;
    localStorage.setItem("cart", JSON.stringify(myCart));
    for (let key in myCart) {
      subt += myCart[key].price * myCart[key].quantity;
    }
    setSubtotal(subt);
  };

  const addToCart = (itemcode, quantity, price, name, size, variant) => {
    let newCart = { ...cart };
    if (newCart[itemcode]) {
      newCart[itemcode].quantity += 1;
    } else {
      newCart[itemcode] = { quantity, price, name, size, variant };
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const buyNow = (itemcode, quantity, price, name, size, variant) => {
    saveCart({});
    let newCart = {};
    newCart[itemcode] = { quantity, price, name, size, variant };
    setCart(newCart);
    saveCart(newCart);
  };

  const updateCartItem = (itemcode, quantity, price, name, size, variant) => {
    let newCart = { ...cart };
    if (newCart[itemcode]) {
      newCart[itemcode].quantity -= 1;
    }
    if (newCart[itemcode].quantity <= 0) {
      delete newCart[itemcode];
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const removeItem = (itemcode) => {
    let newCart = { ...cart };
    delete newCart[itemcode];
    setCart(newCart);
    saveCart(newCart);
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };
  const logout = () => {
    localStorage.removeItem("usertoken");
    setUsertoken({ value: null });
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>The Sharkk Co. - Your Online Shoppers Stop</title>
        <meta name="description" content="Your Online Shoppers Stop!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fav.png" />
      </Head>
      <LoadingBar
        color="#2f8e07"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar
        logout={logout}
        usertoken={usertoken}
        cart={cart}
        addToCart={addToCart}
        updateCartItem={updateCartItem}
        clearCart={clearCart}
        removeItem={removeItem}
        subtotal={subtotal}
      />
      <TopMargin />
      <main className="main">
        <Component
          usertoken={usertoken}
          cart={cart}
          buyNow={buyNow}
          addToCart={addToCart}
          updateCartItem={updateCartItem}
          clearCart={clearCart}
          removeItem={removeItem}
          subtotal={subtotal}
          {...pageProps}
        />
      </main>
      <Footer />
    </>
  );
}

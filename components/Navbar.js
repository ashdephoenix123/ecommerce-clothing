import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Navbar.module.scss";
import Cart from "./Navbar/Cart";
import Hamburger from "./Navbar/Hamburger";
import NavbarList from "./Navbar/NavbarList";
import NavbarMenu from "./Navbar/NavbarMenu";
import SearchBar from "./Navbar/SearchBar";

const Navbar = ({
  cart,
  addToCart,
  updateCartItem,
  clearCart,
  removeItem,
  subtotal,
  usertoken,
  logout,
}) => {
  return (
    <section className="relative z-10">
      <nav className={styles.nav}>
        <Hamburger usertoken={usertoken} />
        <Link href="/" className="lg:hidden">
          <Image
            className={styles.footer__logo}
            src="/fav.png"
            alt="logo"
            width={50}
            height={50}
          />
        </Link>
        <Link href="/" className="hidden lg:block">
          <Image
            width={240}
            height={30}
            className={`${styles.logo}`}
            src="/6.png"
            alt="company logo"
          />
        </Link>
        <NavbarList />
        <SearchBar />
        <NavbarMenu usertoken={usertoken} logout={logout} />
        <Cart
          cart={cart}
          subtotal={subtotal}
          clearCart={clearCart}
          addToCart={addToCart}
          updateCartItem={updateCartItem}
          removeItem={removeItem}
        />
      </nav>
    </section>
  );
};

export default Navbar;

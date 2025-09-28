import React, { useRef, useState } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.scss";
import { IoMdArrowDropup } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiPlusCircle, HiMinusCircle } from "react-icons/hi";
import { BsFillBagFill } from "react-icons/bs";
import { MdDelete, MdAccountCircle } from "react-icons/md";
import { useRouter } from "next/router";
import Error from "next/error";

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
  const cartCheckboxRef = useRef();
  const checkboxRef = useRef();
  const router = useRouter();

  const [searchText, setSearchText] = useState("");

  function unCheck() {
    if (cartCheckboxRef.current) {
      cartCheckboxRef.current.checked = false;
    }
  }

  function unCheck2() {
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
    }
  }

  const searchDB = async (e) => {
    e.preventDefault();
    if (searchText !== "") {
      if (
        searchText === "tshirts" ||
        searchText === "Tshirts" ||
        searchText === "tshirt" ||
        searchText === "Tshirt" ||
        searchText === "t-shirts" ||
        searchText === "T-shirts" ||
        searchText === "t-shirt" ||
        searchText === "T-shirt"
      ) {
        router.push("/tshirts");
      } else if (
        searchText === "hoodies" ||
        searchText === "Hoodies" ||
        searchText === "hoodie" ||
        searchText === "Hoodie"
      ) {
        router.push("/hoodies");
      } else if (
        searchText === "mugs" ||
        searchText === "Mugs" ||
        searchText === "mug" ||
        searchText === "Mug"
      ) {
        router.push("/mugs");
      } else if (
        searchText === "stickers" ||
        searchText === "Stickers" ||
        searchText === "sticker" ||
        searchText === "Sticker"
      ) {
        router.push("/stickers");
      } else if (
        searchText === "sweatshirts" ||
        searchText === "Sweatshirts" ||
        searchText === "sweatshirt" ||
        searchText === "Sweatshirt"
      ) {
        router.push("/sweatshirts");
      } else {
        router.push(`/products/${searchText}`);
      }
    }
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navigation}>
          <input
            type="checkbox"
            ref={checkboxRef}
            className={styles.navigation__checkbox}
            id="navi-toggle"
          />

          <label htmlFor="navi-toggle" className={styles.navigation__button}>
            <span className={styles.navigation__icon}>&nbsp;</span>
          </label>

          <div className={styles.navigation__background}>&nbsp;</div>

          <div className={styles.navigation__nav}>
            <ul className={styles.navigation__list}>
              <li onClick={unCheck2} className={styles.navigation__item}>
                <Link href="/tshirts" className={styles.navigation__link}>
                  Tshirts
                </Link>
              </li>
              <li onClick={unCheck2} className={styles.navigation__item}>
                <Link href="/hoodies" className={styles.navigation__link}>
                  Hoodies
                </Link>
              </li>
              <li onClick={unCheck2} className={styles.navigation__item}>
                <Link href="/mugs" className={styles.navigation__link}>
                  Mugs
                </Link>
              </li>
              <li onClick={unCheck2} className={styles.navigation__item}>
                <Link href="/stickers" className={styles.navigation__link}>
                  Stickers
                </Link>
              </li>
              {/* <li className={styles.navigation__item}><Link href="#" className={styles.navigation__link}>More</Link></li> */}

              {usertoken.value && (
                <li className={`${styles.list__item} ${styles.dropdown}`}>
                  <div className={`${styles.list__itemLink} ${styles.small}`}>
                    <MdAccountCircle size={30} />
                  </div>
                  <div
                    className={`${styles.list__item} ${styles.dropdownContent} w-72`}
                  >
                    <Link
                      onClick={unCheck2}
                      className={`${styles.list__itemLink3} ${styles.fontdown}`}
                      href="/account"
                    >
                      Account
                    </Link>
                    <Link
                      onClick={unCheck2}
                      className={`${styles.list__itemLink3} ${styles.fontdown}`}
                      href="/orders"
                    >
                      Orders
                    </Link>
                    <div
                      onClick={() => {
                        unCheck2();
                        logout();
                      }}
                      className={`${styles.list__itemLink3}  ${styles.fontdown} cursor-pointer`}
                    >
                      Log Out
                    </div>
                  </div>
                </li>
              )}
              {!usertoken.value && (
                <li
                  onClick={unCheck2}
                  className={`${styles.list__item} ${styles.dropdown} `}
                >
                  <Link href="/login">
                    <button className="mt-2 bg-green-600 hover:bg-green-700 text-white py-3 px-5 rounded-xl">
                      Log In
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        <Link href="/">
          <img className={`${styles.logo}`} src="/6.png" alt="company logo" />
        </Link>
        <form className={styles.search} onSubmit={searchDB}>
          <input
            type="text"
            name="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className={styles.search__input}
            placeholder="Search for products, brands and more"
          />
          <button className={styles.search__button}>
            <svg className={styles.search__icon}>
              <use xlinkHref="sprite.svg#icon-magnifying-glass"></use>
            </svg>
          </button>
        </form>
        <ul className={styles.list}>
          <li className={`${styles.list__item} ${styles.dropdown}`}>
            <div className={styles.list__itemLink}>
              All Products
              <IoMdArrowDropup className={styles.upIcon} size={15} />
            </div>
            <div className={`${styles.list__item} ${styles.dropdownContent}`}>
              <Link className={styles.list__itemLink3} href="/tshirts">
                T-Shirts
              </Link>
              <Link className={styles.list__itemLink3} href="/hoodies">
                Hoodies
              </Link>
              <Link className={styles.list__itemLink3} href="/mugs">
                Mugs
              </Link>
              <Link className={styles.list__itemLink3} href="/stickers">
                Stickers
              </Link>
            </div>
          </li>

          {/* <li className={styles.list__item}>
                        <div className={styles.list__itemLink}>
                            <img width={100} height={100} className={styles.darkMode} src="/darkMode.png" alt="" />
                        </div>
                    </li> */}
          {usertoken.value && (
            <li className={`${styles.list__item} ${styles.dropdown}`}>
              <div className={styles.list__itemLink}>
                <MdAccountCircle size={30} />
                <IoMdArrowDropup className={styles.upIcon} size={15} />
              </div>
              <div className={`${styles.list__item} ${styles.dropdownContent}`}>
                <Link className={styles.list__itemLink3} href="/account">
                  Account
                </Link>
                <Link className={styles.list__itemLink3} href="/orders">
                  Orders
                </Link>
                <div
                  onClick={logout}
                  className={`${styles.list__itemLink3} cursor-pointer`}
                >
                  Log Out
                </div>
              </div>
            </li>
          )}
          {!usertoken.value && (
            <li className={`${styles.list__item} ${styles.dropdown}`}>
              <Link href="/login">
                <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-5 rounded-xl">
                  Log In
                </button>
              </Link>
            </li>
          )}
        </ul>

        <div className={styles.cart}>
          <input
            type="checkbox"
            name="cart"
            id="cartSidebar"
            className={styles.cart__checkbox}
            ref={cartCheckboxRef}
          />
          <label htmlFor="cartSidebar" className={styles.cart__label}>
            <div
              className={`${styles.list__itemLink} ${styles.list__itemLinkCartIcon}`}
            >
              <AiOutlineShoppingCart size={30} />
            </div>
          </label>
          <div className={styles.cart__background}>
            <div className={styles.cart__nav}>
              <span className={styles.cart__close} onClick={unCheck}>
                &#9587;
              </span>
              <h2>Shopping Cart</h2>
              <ol className={styles.cart__List}>
                {Object.keys(cart).length === 0 && (
                  <li className="text-2xl mx-auto">
                    Uh oh! Your Cart is Empty!
                  </li>
                )}
                {Object.keys(cart).map((item, index) => {
                  return (
                    <li key={item}>
                      {index +
                        1 +
                        ". " +
                        cart[item].name +
                        " - (" +
                        cart[item].size +
                        " / " +
                        cart[item].variant +
                        ")" +
                        " - ₹" +
                        cart[item].price}
                      <div>
                        <HiMinusCircle
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
                          onClick={() => {
                            removeItem(item);
                          }}
                          size={20}
                        />
                      </div>
                    </li>
                  );
                })}
              </ol>
              <div className="py-2 px-8 my-5">
                {subtotal !== 0 && <div>SubTotal - ₹{subtotal}</div>}
              </div>
              <Link onClick={unCheck} href={`/checkout`}>
                <button className={`${styles.btn} mb-1`}>
                  <BsFillBagFill size={20} />
                  Checkout
                </button>
              </Link>
              <button className={styles.btn} onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

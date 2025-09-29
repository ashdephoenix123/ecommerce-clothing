import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillBagFill } from "react-icons/bs";
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import styles from "../../styles/Navbar.module.scss";
import { useRef } from "react";

const Cart = ({ cart, subtotal, clearCart }) => {
  const checkboxRef = useRef();
  const cartCheckboxRef = useRef();

  function unCheck() {
    if (cartCheckboxRef.current) {
      cartCheckboxRef.current.checked = false;
    }
  }

  return (
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
          <AiOutlineShoppingCart size={25} />
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
              <li className="text-2xl mx-auto">Uh oh! Your Cart is Empty!</li>
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
  );
};

export default Cart;

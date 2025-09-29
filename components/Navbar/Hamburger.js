import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";
import styles from "../../styles/Navbar.module.scss";
import { useRef } from "react";

const Hamburger = ({ usertoken }) => {
  const checkboxRef = useRef();

  function unCheck2() {
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
    }
  }

  return (
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
  );
};

export default Hamburger;

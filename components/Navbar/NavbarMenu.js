import Link from "next/link";
import { IoMdHeartEmpty } from "react-icons/io";
import styles from "../../styles/Navbar.module.scss";
import ProfileMenu from "./ProfileMenu";

const NavbarMenu = () => {
  return (
    <>
      <ul className={styles.list}>
        <li className={`${styles.list__item} ${styles.dropdown}`}>
          <ProfileMenu />
        </li>
        <li className={`${styles.list__item} ${styles.dropdown}`}>
          <Link
            href="/wishlist"
            className={`${styles.list__itemLink} ${styles.list__itemLinkCartIcon}`}
          >
            <IoMdHeartEmpty color="#fff" size={25} />
          </Link>
        </li>
      </ul>
    </>
  );
};

export default NavbarMenu;

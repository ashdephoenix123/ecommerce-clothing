import { useState } from "react";
import styles from "../../styles/Navbar.module.scss";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="flex-1">
      <form className={`${styles.search} hidden lg:flex`} onSubmit={() => {}}>
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
    </div>
  );
};

export default SearchBar;

import Filters from "../Filters";
import ProductCard from "../ProductCard";
import styles from "../../styles/tshirts.module.scss";
import { productsData } from "@/constants/mock";
import { Typography } from "@mui/material";
import SortBy from "./SortBy";

let products = productsData;

const ProductsLayout = () => {
  return (
    <section className="grid grid-cols-5">
      <div className="col-span-5 flex justify-between items-center">
        <Typography>Filters</Typography>
        <SortBy />
      </div>
      <div className="shrink-0 hidden lg:block">
        <Filters />
      </div>
      <div className="flex-1 col-span-4">
        <div className={styles.test}>
          <div className={styles.allCards}>
            {Object.keys(products).length === 0 && (
              <p className="flex justify-center items-center italic">
                No {title} to display Or they are currently Out of Stock. Please
                try again later.
              </p>
            )}
            {Object.keys(products).map((item) => {
              return <ProductCard key={item.id} product={products[item]} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsLayout;

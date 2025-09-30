import { productsData } from "@/constants/mock";
import { Button, Typography } from "@mui/material";
import styles from "../../styles/tshirts.module.scss";
import Filters from "../Filters";
import ProductCard from "../ProductCard";
import SortBy from "./SortBy";
import { useSelector } from "react-redux";

let products = productsData;

const ProductsLayout = () => {
  const hasFilters = useSelector((state) => state.products.hasFilters);

  return (
    <section className="grid grid-cols-5 gap-12">
      <div className="flex justify-between items-center border-b">
        <Typography variant="h3" textTransform="uppercase">
          Filters
        </Typography>
        {hasFilters && (
          <Button
            disableRipple
            variant="text"
            sx={{ textTransform: "uppercase" }}
          >
            clear all
          </Button>
        )}
      </div>
      <div className="col-span-4 justify-items-end border-b pb-4">
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
            {Object.keys(products).map((item) => (
              <ProductCard key={item} product={products[item]} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsLayout;

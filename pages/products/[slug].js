import Filters from "@/components/Filters";
import ProductCard from "@/components/ProductCard";
import { productsData } from "@/constants/mock";
import { useRouter } from "next/router";
import styles from "../../styles/tshirts.module.scss";

// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Product = () => {
  const router = useRouter();
  const title = router.query.slug;

  let products = productsData;

  return (
    <section className="flex my-20">
      <div className="shrink-0 md:basis-1/5 hidden lg:block p-4">
        <Filters />
      </div>
      <div className="flex-1">
        <h2 className={styles.productTitle}>Trending {title} Collection</h2>
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

export default Product;

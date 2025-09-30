import Link from "next/link";
import styles from "../styles/tshirts.module.scss";

const ProductCard = ({ product }) => {
  return (
    <Link href={`/product/${product.productId}`} className="flex-1">
      <div className={`${styles.card} h-full`}>
        <div className={styles.cardImageDiv}>
          <img
            className={styles.cardImage}
            src={product.img}
            alt={product.title + "Image"}
          />
        </div>
        <div className={styles.cardContent}>
          <h3>{product.category}</h3>
          <h2>{product.title}</h2>
          <div className={styles.price}>
            {product.availableQty !== 0 ? (
              "₹" + product.price
            ) : (
              <span className="text-red-700 font-semibold">Out of Stock</span>
            )}
          </div>

          {product["size"].includes("S") && (
            <div className={styles.size}>S</div>
          )}
          {product["size"].includes("M") && (
            <div className={styles.size}>M</div>
          )}
          {product["size"].includes("L") && (
            <div className={styles.size}>L</div>
          )}
          {product["size"].includes("XL") && (
            <div className={styles.size}>XL</div>
          )}
          {product["size"].includes("XXL") && (
            <div className={styles.size}>XXL</div>
          )}
          <br />
          {product.color.map((individualColor, index) => {
            return (
              <button
                key={index}
                className="border-2 mt-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none"
                style={{ backgroundColor: individualColor }}
              ></button>
            );
          })}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

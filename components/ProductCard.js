import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/tshirts.module.scss";

const ProductCard = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const href = `/product/${product.slug}`;
  const allSizes = product.variants.flatMap((variant) => variant.size);

  return (
    <Link href={href} className={`${styles.card} h-full`}>
      <div className={styles.cardImageDiv}>
        <Image
          className={styles.cardImage}
          src={selectedVariant.images[0]}
          width={640}
          height={320}
          alt={product.name + "Image"}
        />
      </div>
      <div className={styles.cardContent}>
        <h3 className="uppercase">{product.category.third.label}</h3>
        <h2>{product.name}</h2>
        <div className={styles.price}>
          {selectedVariant.stock !== 0 ? (
            "₹" + selectedVariant.price
          ) : (
            <span className="text-red-700 font-semibold">Out of Stock</span>
          )}
        </div>

        {allSizes.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {allSizes.map((variant) => (
              <div key={variant} className={styles.size}>
                {variant}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1 mt-2">
          {product.variants.map((variant) => {
            return (
              <button
                key={variant.color + "-" + variant.size}
                className="rounded-full w-7 h-7 focus:outline-none"
                style={{ backgroundColor: variant.color }}
              ></button>
            );
          })}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

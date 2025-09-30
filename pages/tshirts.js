import React from "react";
import styles from "../styles/tshirts.module.scss";
import Link from "next/link";
import connectDB from "@/middleware/conn";
import Product from "../models/Product";

const tshirts = ({ products }) => {
  return (
    <>
      <section className="container">
        <h2 className={styles.productTitle}>Trending Tshirt Collection</h2>
        <div className={styles.test}>
          {/* <div className={styles.left}>
                        filters
                    </div> */}
          <div className={styles.allCards}>
            {Object.keys(products).length === 0 && (
              <p className="flex justify-center items-center italic">
                No T-Shirts to display Or they are currently Out of Stock.
                Please try again later.
              </p>
            )}
            {Object.keys(products).map((item) => {
              return (
                <Link
                  key={products[item]._id}
                  href={`/product/${products[item].productId}`}
                >
                  <div className={styles.card}>
                    <div className={styles.cardImageDiv}>
                      <img
                        className={styles.cardImage}
                        src={products[item].img}
                        alt={products[item].title + "Image"}
                      />
                    </div>
                    <div className={styles.cardContent}>
                      <h3>{products[item].category}</h3>
                      <h2>{products[item].title}</h2>
                      <div className={styles.price}>
                        {products[item].availableQty !== 0 ? (
                          "₹" + products[item].price
                        ) : (
                          <span className="text-red-700 font-semibold">
                            Out of Stock
                          </span>
                        )}
                      </div>

                      {products[item]["size"].includes("S") && (
                        <div className={styles.size}>S</div>
                      )}
                      {products[item]["size"].includes("M") && (
                        <div className={styles.size}>M</div>
                      )}
                      {products[item]["size"].includes("L") && (
                        <div className={styles.size}>L</div>
                      )}
                      {products[item]["size"].includes("XL") && (
                        <div className={styles.size}>XL</div>
                      )}
                      {products[item]["size"].includes("XXL") && (
                        <div className={styles.size}>XXL</div>
                      )}
                      <br />
                      {products[item].color.map((individualColor, index) => {
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
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  await connectDB();
  const products = await Product.find({ category: "T-shirt" });
  let tshirts = {};
  for (let item of products) {
    if (item.title in tshirts) {
      if (
        !tshirts[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].color.push(item.color);
      }
      if (
        !tshirts[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].size.push(item.size);
      }
    } else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color];
        tshirts[item.title].size = [item.size];
      } else {
        tshirts[item.title].color = [];
        tshirts[item.title].size = [];
      }
    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) }, // will be passed to the page component as props
  };
}

export default tshirts;

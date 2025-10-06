import PageInfo from "@/components/products/PageInfo";
import ProductsLayout from "@/components/products/ProductsLayout";
import axios from "axios";

const Product = ({ products, error }) => {
  if (error) {
    return <section className="error">Failed to load data!</section>;
  }

  return (
    <section className="p-10">
      <PageInfo />
      <ProductsLayout products={products} />
    </section>
  );
};

export default Product;

export async function getServerSideProps(context) {
  const { query } = context;
  const filters = {
    categories: query?.categories?.split(",") || [],
    brands: query?.brands?.split(",") || [],
    colors: query?.colors?.split(",") || [],
    fromPrice: query?.fromPrice || "0",
    toPrice: query?.toPrice || "0",
    discount: query?.discount || "",
    sortby: query?.sortby || "recommended",
  };

  try {
    const allproducts = await axios.get(
      `http://localhost:3000/api/getCommodities`
    );
    return {
      props: {
        products: allproducts.data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        error: "Failed!",
      },
    };
  }
}

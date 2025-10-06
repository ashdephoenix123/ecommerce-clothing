import PageInfo from "@/components/products/PageInfo";
import ProductsLayout from "@/components/products/ProductsLayout";
import { allproducts } from "@/constants/mock";
// import connectDB from "@/middleware/conn";
// import Commodity from "@/models/Commodity";

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
    // await connectDB();
    // const alldata = await Commodity.find({}).lean();
    // const parseddata = JSON.parse(JSON.stringify(alldata)),

    return {
      props: {
        products: allproducts,
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

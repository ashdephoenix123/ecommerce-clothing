import PageInfo from "@/components/products/PageInfo";
import ProductsLayout from "@/components/products/ProductsLayout";

const Product = ({ data }) => {
  return (
    <section className="p-10">
      <PageInfo />
      <ProductsLayout />
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

  // Make an API call with these filters

  return {
    props: {
      data: [],
    },
  };
}

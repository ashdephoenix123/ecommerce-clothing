import api from "@/axios/instance";
import PageInfo from "@/components/products/PageInfo";
import ProductsLayout from "@/components/products/ProductsLayout";
import { Pagination, Stack } from "@mui/material";

const Product = ({ products, error }) => {
  if (error) {
    console.log(JSON.parse(error));
    return <section className="error">Failed to load data!</section>;
  }

  return (
    <section className="p-10">
      <PageInfo />
      <ProductsLayout products={products} />
      <Stack direction="row" justifyContent="center" sx={{ my: 8 }}>
        <Pagination count={10} color="primary" />
      </Stack>
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
    const allproducts = await api.get(`/getCommodities`);
    return {
      props: {
        products: allproducts?.data || [],
      },
    };
  } catch (error) {
    return {
      props: {
        error: JSON.stringify(error),
      },
    };
  }
}

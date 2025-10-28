import api from "@/axios/instance";
import PageInfo from "@/components/products/PageInfo";
import ProductsLayout from "@/components/products/ProductsLayout";
import { Pagination, Stack } from "@mui/material";

const Product = ({ products, categories, error }) => {
  if (error) {
    console.log(JSON.parse(error));
    return <section className="error">Failed to load data!</section>;
  }

  console.log("categories\n", categories);

  return (
    <section className="p-10">
      <PageInfo />
      <ProductsLayout products={products} categories={categories} />
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
    fromPrice: query?.fromPrice || null,
    toPrice: query?.toPrice || null,
    discount: query?.discount || "",
    sortby: query?.sortby || "recommended",
  };

  const categories = await api.get(`/apiCat3?cat2slug=${query.slug}`);

  const config = {
    "Content-Type": "application/json",
  };

  try {
    const allproducts = await api.post(`/getCommodities`, filters, config);
    return {
      props: {
        products: allproducts?.data || [],
        categories: categories.data.data,
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

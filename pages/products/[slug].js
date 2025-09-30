import PageInfo from "@/components/products/PageInfo";
import ProductsLayout from "@/components/products/ProductsLayout";
import { productsData } from "@/constants/mock";
import { useRouter } from "next/router";

// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Product = () => {
  const router = useRouter();
  const title = router.query.slug;

  let products = productsData;

  return (
    <section className="p-6">
      <PageInfo />
      <ProductsLayout />
    </section>
  );
};

export default Product;

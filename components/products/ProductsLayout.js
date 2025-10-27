import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Filters from "../Filters";
import ProductCard from "../ProductCard";
import SortBy from "./SortBy";

const ProductsLayout = ({ products }) => {
  const router = useRouter();
  const { query } = router;
  const initialFilterState = {
    categories: [],
    brands: [],
    colors: [],
    discount: null,
    fromPrice: "0",
    toPrice: "1000",
  };
  const [filters, setFilters] = useState(initialFilterState);

  let hasFilters =
    filters.categories.length > 0 ||
    filters.brands.length > 0 ||
    filters.colors.length > 0;

  const resetFilters = () => {
    router.push(`/products/asas`);
  };

  useEffect(() => {
    setFilters({
      categories:
        query?.categories?.split(",") || initialFilterState.categories,
      brands: query?.brands?.split(",") || initialFilterState.brands,
      colors: query?.colors?.split(",") || initialFilterState.colors,
      discount: query?.discount || initialFilterState.discount,
      fromPrice: query?.fromPrice || initialFilterState.fromPrice,
      toPrice: query?.toPrice || initialFilterState.toPrice,
    });
  }, [query]);

  return (
    <section className="grid grid-cols-5 gap-12">
      <div className="flex justify-between items-center border-b">
        <Typography variant="h3" textTransform="uppercase">
          Filters
        </Typography>
        {hasFilters && (
          <Button
            disableRipple
            variant="text"
            sx={{ textTransform: "uppercase" }}
            onClick={resetFilters}
          >
            clear all
          </Button>
        )}
      </div>
      <div className="col-span-4 justify-items-end border-b pb-4">
        <SortBy />
      </div>

      <div className="shrink-0 hidden lg:block">
        <Filters filters={filters} />
      </div>
      <div className="flex-1 col-span-5 lg:col-span-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 self-start">
        {products.length === 0 && (
          <p className="flex justify-center items-center italic">
            Nothing to display Or they are currently Out of Stock. Please try
            again later.
          </p>
        )}
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductsLayout;

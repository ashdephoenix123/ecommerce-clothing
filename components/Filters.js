import { filtersOption } from "@/constants/mock";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Filter from "./Filter";
import FilterRadio from "./FilterRadio";
import PriceFilter from "./PriceFilter";

const Filters = () => {
  const router = useRouter();
  const { query } = router;
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    colors: [],
    discount: null,
    fromPrice: "0",
    toPrice: "0",
  });

  useEffect(() => {
    setFilters({
      categories: query?.categories?.split(",") || [],
      brands: query?.brands?.split(",") || [],
      colors: query?.colors?.split(",") || [],
      discount: query?.discount || null,
      fromPrice: query?.fromPrice || "0",
      toPrice: query?.toPrice || "",
    });
  }, [query]);

  return (
    <Stack gap={2}>
      <Filter
        id="categories"
        label="Categories"
        options={filtersOption[0].options}
        selected={filters.categories}
      />
      <Filter
        id="brands"
        label="Brands"
        options={filtersOption[1].options}
        selected={filters.brands}
      />
      <PriceFilter
        id="price"
        label="Price"
        fromPrice={filters.fromPrice}
        toPrice={filters.toPrice}
      />
      <Filter
        id="colors"
        label="Colors"
        options={filtersOption[2].options}
        selected={filters.colors}
      />
      <FilterRadio
        id="discount"
        label="Discount Range"
        options={filtersOption[3].options}
        selected={filters.discount}
      />
    </Stack>
  );
};

export default Filters;

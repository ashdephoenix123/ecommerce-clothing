import { filtersOption } from "@/constants/mock";
import { Stack } from "@mui/material";
import Filter from "./Filter";
import FilterRadio from "./FilterRadio";
import PriceFilter from "./PriceFilter";

const Filters = ({ filters, categories }) => {
  return (
    <Stack gap={2}>
      <Filter
        id="categories"
        label="Categories"
        options={categories}
        selected={filters.categories}
      />
      {/* <Filter
        id="brands"
        label="Brands"
        options={filtersOption[1].options}
        selected={filters.brands}
      /> */}
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
      {/* <FilterRadio
        id="discount"
        label="Discount Range"
        options={filtersOption[3].options}
        selected={filters.discount}
      /> */}
    </Stack>
  );
};

export default Filters;

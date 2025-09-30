import { filtersOption } from "@/constants/mock";
import { Stack } from "@mui/material";
import Filter from "./Filter";
import FilterRadio from "./FilterRadio";
import PriceFilter from "./PriceFilter";

const Filters = () => {
  return (
    <Stack gap={2}>
      <Filter label="Categories" options={filtersOption[0].options} />
      <Filter label="Brand" options={filtersOption[1].options} />
      <PriceFilter label="Price" />
      <Filter label="Colors" options={filtersOption[2].options} type="color" />
      <FilterRadio label="Discount Range" options={filtersOption[3].options} />
    </Stack>
  );
};

export default Filters;

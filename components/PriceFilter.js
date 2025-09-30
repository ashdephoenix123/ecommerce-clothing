import FilterWrapper from "./FilterWrapper";
import Range from "./Range";

const PriceFilter = ({ label }) => {
  return (
    <FilterWrapper label={label}>
      <Range />
    </FilterWrapper>
  );
};

export default PriceFilter;

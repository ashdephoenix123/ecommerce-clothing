import FilterWrapper from "./FilterWrapper";
import Range from "./Range";

const PriceFilter = ({ label, ...props }) => {
  return (
    <FilterWrapper label={label}>
      <Range {...props} />
    </FilterWrapper>
  );
};

export default PriceFilter;

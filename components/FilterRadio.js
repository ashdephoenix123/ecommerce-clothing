import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FilterWrapper from "./FilterWrapper";

const FilterRadio = ({ label, options }) => {
  return (
    <FilterWrapper label={label}>
      <FormControl>
        <RadioGroup
          aria-labelledby={`${label}-buttons-group-label`}
          name={`${label}-buttons-group`}
        >
          {options.map((option) => (
            <FormControlLabel
              key={option.id}
              value={option.id}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </FilterWrapper>
  );
};

export default FilterRadio;

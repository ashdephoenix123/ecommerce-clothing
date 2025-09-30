import { formURL } from "@/utils/helpers";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useRouter } from "next/router";
import FilterWrapper from "./FilterWrapper";

const FilterRadio = ({ id, label, options, selected }) => {
  const router = useRouter();
  const handleChange = (event) => {
    const optionID = event.target.value;
    const path = formURL(id, optionID, router);
    router.push(path);
  };

  return (
    <FilterWrapper label={label}>
      <FormControl>
        <RadioGroup
          aria-labelledby={`${label}-buttons-group-label`}
          name={`${label}-buttons-group`}
          value={selected}
          onChange={handleChange}
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

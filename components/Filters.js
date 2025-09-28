import { filtersOption } from "@/constants/mock";
import { Checkbox, FormControlLabel, FormGroup, Slider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Filter from "./Filter";
import Range from "./Range";

const Filters = () => {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <section>
      <Typography variant="h1" sx={{ fontSize: 18, mb: 2 }}>
        Filters
      </Typography>
      {filtersOption.map((filter) => (
        <Filter
          key={filter.id}
          id={filter.id}
          label={filter.label}
          isExpanded={expanded === filter.id}
          onChange={handleChange(filter.id)}
        >
          <FormGroup>
            {filter.options.map((option) => (
              <FormControlLabel
                key={option.label}
                labelPlacement="start"
                control={<Checkbox defaultChecked />}
                label={option.label}
                sx={{ flexDirection: "row", ml: 0 }}
              />
            ))}
          </FormGroup>
        </Filter>
      ))}

      <Filter
        id={"price"}
        label={"Price"}
        isExpanded={expanded === "price"}
        onChange={handleChange("price")}
      >
        <Range />
      </Filter>
    </section>
  );
};

export default Filters;

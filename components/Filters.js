import { filtersOption } from "@/constants/mock";
import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h1" sx={{ fontSize: 18, px: "16px" }}>
          Filters
        </Typography>
        {/* <Button variant="outlined">Reset</Button> */}
      </Box>
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
                control={<Checkbox size="medium" />}
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

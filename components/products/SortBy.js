import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useState } from "react";

const sortoptions = [
  {
    id: "recommended",
    label: "Recommended",
  },
  {
    id: "whats-new",
    label: "What's New",
  },
  {
    id: "high-to-low",
    label: "Price: High to Low",
  },
  {
    id: "low-to-high",
    label: "Price: Low to High",
  },
  {
    id: "rating",
    label: "Customer Rating",
  },
];

export default function SortBy() {
  const [age, setAge] = useState("");
  const [value, setValue] = useState(sortoptions[0].id);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box>
      <FormControl sx={{ width: 280 }}>
        <Select
          size="small"
          value={value}
          onChange={handleChange}
          displayEmpty
          renderValue={(selected) => {
            const findSelected = sortoptions.find(
              (option) => option.id === selected
            );
            return (
              <Typography display="flex" alignItems="center">
                Sort By:&nbsp;
                <Typography variant="h4" component="span">
                  {" "}
                  {findSelected?.label}
                </Typography>
              </Typography>
            );
          }}
        >
          {sortoptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

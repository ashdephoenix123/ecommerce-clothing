import {
  Box,
  Button,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const Range = () => {
  const MIN = 0;
  const MAX = 1000;
  const [value, setValue] = useState([0, 400]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePriceUpdate = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setValue((prev) => {
      const minVal = name === "min" ? value : prev[0];
      const maxVal = name === "max" ? value : prev[1];
      return [minVal, maxVal];
    });
  };

  return (
    <Box>
      <Box display="flex" gap={1} mb={2}>
        <Stack>
          <Typography variant="caption" fontSize={12}>
            Min. Amount
          </Typography>
          <TextField
            variant="filled"
            name="min"
            value={value[0]}
            onChange={handlePriceUpdate}
          />
        </Stack>
        <Stack justifyContent="space-between">
          <Typography variant="caption" fontSize={12}>
            Max. Amount
          </Typography>
          <TextField
            variant="filled"
            name="max"
            value={value[1]}
            onChange={handlePriceUpdate}
          />
        </Stack>
      </Box>
      <Box width="100%" mb={1}>
        <Slider
          min={MIN}
          max={MAX}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" sx={{ cursor: "pointer" }}>
            {MIN} min
          </Typography>
          <Typography variant="body2" sx={{ cursor: "pointer" }}>
            {MAX} max
          </Typography>
        </Box>
      </Box>
      <Button fullWidth variant="contained">
        Apply
      </Button>
    </Box>
  );
};

export default Range;

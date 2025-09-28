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
  const [value, setValue] = useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box display="flex" gap={1}>
        <Stack>
          <Typography variant="h4" fontSize={12}>
            Min Amount
          </Typography>
          <TextField id="outlined-basic" variant="outlined" />
        </Stack>
        <Stack justifyContent="space-between">
          <Typography variant="h4" fontSize={12}>
            Max Amount
          </Typography>
          <TextField id="outlined-basic" variant="outlined" />
        </Stack>
      </Box>
      <Box width="100%">
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
        />
      </Box>
      <Button fullWidth variant="outlined">
        Apply
      </Button>
    </Box>
  );
};

export default Range;

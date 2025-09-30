import {
  Box,
  Button,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Range = ({ id, fromPrice, toPrice }) => {
  const MIN = 0;
  const MAX = 1000;
  const [value, setValue] = useState([fromPrice, toPrice]);
  const router = useRouter();

  useEffect(() => {
    setValue([fromPrice, toPrice]);
  }, [fromPrice, toPrice]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateFilter = () => {
    const { slug, ...restQuery } = router.query;

    const params = new URLSearchParams(restQuery || {});
    params.set("fromPrice", value[0]);
    params.set("toPrice", value[1]);

    router.push({
      pathname: `/products/${slug || ""}`,
      query: Object.fromEntries(params.entries()),
    });
  };

  const handlePriceUpdate = (e) => {
    const { name, value } = e.target;
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
      <Button fullWidth variant="contained" onClick={updateFilter}>
        Apply
      </Button>
    </Box>
  );
};

export default Range;

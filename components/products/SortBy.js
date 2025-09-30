import { sortoptions } from "@/constants/constants";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SortBy() {
  const router = useRouter();
  const { query } = router;
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (query.sortby) {
      setValue(query?.sortby || sortoptions[0].id);
    }
  }, [query]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);

    const { slug, ...restQuery } = query;
    const params = new URLSearchParams(restQuery || {});

    params.set("sortby", newValue);
    router.push({
      pathname: `/products/${slug || ""}`,
      query: Object.fromEntries(params.entries()),
    });
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

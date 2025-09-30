import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

const FilterWrapper = ({ label, children }) => {
  return (
    <Stack gap={1}>
      <Typography variant="h4" textTransform="uppercase">
        {label}
      </Typography>
      {children}
    </Stack>
  );
};

export default FilterWrapper;

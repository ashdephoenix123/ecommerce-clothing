import { Box, FormGroup, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CheckBox from "./CheckBox";
import FilterWrapper from "./FilterWrapper";

const Filter = ({ label, options, type }) => {
  const theme = useTheme();
  const colorLabel = (label, color) => (
    <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
      <Box
        sx={{
          width: theme.typography.fontSize,
          height: theme.typography.fontSize,
          backgroundColor: color,
          borderRadius: 7,
          borderWidth: "1px",
          borderColor: theme.palette.grey["300"],
        }}
      ></Box>
      <Typography variant="h6" color="secondary">
        {label}
      </Typography>
    </Box>
  );

  return (
    <FilterWrapper label={label}>
      <FormGroup>
        {options.map((option) => (
          <CheckBox
            key={option.label}
            label={
              type !== "color"
                ? option.label
                : colorLabel(option.label, option.color)
            }
          />
        ))}
      </FormGroup>
    </FilterWrapper>
  );
};

export default Filter;

import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { IoCheckbox, IoSquareOutline } from "react-icons/io5";
import FilterWrapper from "./FilterWrapper";
import { formURL } from "@/utils/helpers";

const Filter = ({ id, label, options, selected }) => {
  const theme = useTheme();
  const router = useRouter();

  const handleChange = (optionID) => {
    const path = formURL(id, optionID, router);
    router.push(path);
  };

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
        {options.map((option) => {
          return (
            <FormControlLabel
              key={option.id}
              labelPlacement="start"
              control={
                <Checkbox
                  size="large"
                  checked={Boolean(selected.includes(option.id))}
                  onChange={() => handleChange(option.id)}
                  icon={<IoSquareOutline />}
                  checkedIcon={<IoCheckbox />}
                />
              }
              label={
                id !== "colors"
                  ? option.label
                  : colorLabel(option.label, option.color)
              }
              sx={{ flexDirection: "row", ml: 0 }}
            />
          );
        })}
      </FormGroup>
    </FilterWrapper>
  );
};

export default Filter;

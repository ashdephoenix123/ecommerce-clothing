import { formURL } from "@/utils/helpers";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useState } from "react";
import { IoCheckbox, IoSquareOutline } from "react-icons/io5";
import AllOptions from "./AllOptions";
import FilterWrapper from "./FilterWrapper";

const Filter = ({ id, label, options, selected }) => {
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    <>
      <FilterWrapper label={label}>
        <FormGroup>
          {options.slice(0, 8).map((option) => {
            return (
              <FormControlLabel
                key={option._id}
                labelPlacement="start"
                control={
                  <Checkbox
                    size="large"
                    checked={Boolean(selected.includes(option._id))}
                    onChange={() => handleChange(option._id)}
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
      <Button
        variant="text"
        onClick={handleClickOpen}
        sx={{ justifyContent: "flex-start", p: 0, mt: -2 }}
        disableRipple
      >
        +100 items
      </Button>
      <AllOptions
        id={id}
        label={label}
        open={open}
        handleClose={handleClose}
        options={options}
        selected={selected}
        handleChange={handleChange}
        router={router}
      />
    </>
  );
};

export default Filter;

import { Checkbox, FormControlLabel } from "@mui/material";
import { IoCheckbox, IoSquareOutline } from "react-icons/io5";

const CheckBox = ({ label }) => {
  return (
    <FormControlLabel
      labelPlacement="start"
      control={
        <Checkbox
          size="large"
          icon={<IoSquareOutline />}
          checkedIcon={<IoCheckbox />}
        />
      }
      label={label}
      sx={{ flexDirection: "row", ml: 0 }}
    />
  );
};

export default CheckBox;

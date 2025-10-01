import { debounce, formURL, groupedBrands } from "@/utils/helpers";
import {
  Box,
  Checkbox,
  DialogActions,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { IoCheckbox, IoSquareOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

export default function AllOptions({
  id,
  label,
  open,
  handleClose,
  options,
  selected,
  router,
}) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [allOptions, setAllOptions] = React.useState(groupedBrands(options));
  const [userselected, setuserselected] = React.useState(selected || []);

  React.useEffect(() => {
    setuserselected(selected);
  }, [selected]);

  const debouncedSearch = React.useMemo(() => {
    return debounce((value) => {
      setAllOptions(groupedBrands(options, value));
    }, 300);
  }, []);

  const handleTextUpdate = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const updateUpserSelection = (brandID) => {
    setuserselected((prev) => {
      if (prev.includes(brandID)) {
        return prev.filter((bid) => bid !== brandID);
      }
      return [...prev, brandID];
    });
  };

  const applyChanges = () => {
    const path = formURL(id, userselected, router);
    router.push(path);
    handleClose();
  };

  const savewithoutchanges = () => {
    setuserselected(selected);
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={savewithoutchanges}
        fullWidth
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <TextField
              size="small"
              variant="filled"
              placeholder={`Search ${label}`}
              value={searchTerm}
              onChange={handleTextUpdate}
            />
            <Button
              sx={{ p: 0, justifyContent: "end" }}
              disableRipple
              onClick={savewithoutchanges}
            >
              <RxCross1 size={20} />
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              mt: 2,
              columnCount: { xs: 2, md: 4 },
              columnGap: 2,
              maxHeight: 500,
              overflowY: "auto",
            }}
          >
            {Object.keys(allOptions).map((letter) => (
              <Box key={letter} sx={{ mb: 2 }}>
                <Typography variant="h4" mb={1}>
                  {letter}
                </Typography>
                <div className="grid grid-cols-1 gap-2">
                  <FormGroup>
                    {allOptions[letter].map((brand, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            icon={<IoSquareOutline />}
                            checkedIcon={<IoCheckbox />}
                            checked={Boolean(userselected.includes(brand[0]))}
                            onChange={() => updateUpserSelection(brand[0])}
                          />
                        }
                        label={brand[1]}
                        sx={{ margin: 0 }}
                      />
                    ))}
                  </FormGroup>
                </div>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={savewithoutchanges}>
            Cancel
          </Button>
          <Button variant="contained" onClick={applyChanges} autoFocus>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

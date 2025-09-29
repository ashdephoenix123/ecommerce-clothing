import { Box, Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { CiUser } from "react-icons/ci";
import styles from "../../styles/Navbar.module.scss";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

const ProfileMenu = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div
        className={`${styles.list__itemLink} ${styles.list__itemLinkCartIcon}`}
        onClick={handleClick}
      >
        <CiUser color="#fff" size={25} />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
              cursor: "initial",
            },
          }}
        >
          <Stack gap={2}>
            <Box>
              <Typography variant="h4">Welcome!</Typography>
              <Typography>To access your account and manage orders</Typography>
            </Box>
            <Button
              variant="outlined"
              sx={{
                fontSize: theme.typography.fontSize * 0.8,
                textTransform: "uppercase",
                fontWeight: 600,
                letterSpacing: theme.spacing(1) * 0.75,
              }}
            >
              Login/SignUp
            </Button>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleClose}>Orders</MenuItem>
        <MenuItem onClick={handleClose}>Wishlist</MenuItem>
        <MenuItem onClick={handleClose}>Contact Us</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;

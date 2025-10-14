import { Box, Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useState } from "react";
import { CiUser } from "react-icons/ci";
import styles from "../../styles/Navbar.module.scss";

const ProfileMenu = ({ usertoken, logout }) => {
  const token = usertoken?.value || "";
  const router = useRouter();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const viewMyAccount = () => {
    handleClose();
    router.push("/account");
  };
  const contact = () => {
    handleClose();
    router.push("/contact");
  };
  const viewWishList = () => {
    handleClose();
    router.push("/wishlist");
  };
  const viewMyOrders = () => {
    handleClose();
    if (token) {
      router.push("/orders");
    } else {
      router.push("/login");
    }
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
              onClick={logout}
            >
              {token ? "Log Out" : "Login/SignUp"}
            </Button>
          </Stack>
        </MenuItem>
        {token && <MenuItem onClick={viewMyAccount}>My Account</MenuItem>}
        <MenuItem onClick={viewMyOrders}>Orders</MenuItem>
        <MenuItem onClick={viewWishList}>Wishlist</MenuItem>
        <MenuItem onClick={contact}>Contact Us</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;

import { useState, useEffect, createRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "state/global";
import { logout } from "state/auth";
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
  Box,
  Typography,
  Avatar,
  Paper,
  Menu,
  MenuItem,
  Tooltip,
  Divider,
  ListItemIcon,
  ListItemText,
  Zoom,
} from "@mui/material";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  LogoutOutlined,
  ArrowDropDownOutlined,
  PersonAdd,
  Settings,
  Logout,
  Person,
} from "@mui/icons-material";
import { Slide } from "@mui/material";
import { APP_VERSION } from "data";

import photo from "../assets/photo_color.png";
import photocolor from "../assets/photo_color.png";
import SmallDialog from "./SmallDialog";
import BuyMoreCredits from "./BuyMoreCredits";
import { motion } from "motion/react";
import { useLogoutMutation } from "api/apiSlice";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { email } = useSelector((state) => state.authentication.user);
  const [logoutMut] = useLogoutMutation();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutMut();
    dispatch(logout());
    navigate("/login");
  };

  const handleAvatarClick = () => {};

  return (
    <>
      <AppBar
        sx={{
          position: "static",
          background: "none",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* LEFT SIDE */}
          <FlexBetween>
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <MenuIcon />
            </IconButton>
          </FlexBetween>

          {/* RIGHT SIDE */}
          <FlexBetween gap="1rem">
            {location.pathname !== "/checkout" && (
              <motion.Box
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
              >
                <BuyMoreCredits location={location} />
              </motion.Box>
            )}

            <>
              <motion.Box
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{
                  rotateY: 15,
                  rotateX: 5,
                  rotateZ: 5,
                  scale: 1.07,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  perspective: 600, // Needed for 3D effect
                }}
              >
                <Tooltip title="Account">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 0.5 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar
                      sx={{
                        border: `1px solid ${theme.palette.primary.main}`,
                      }}
                      src={`https://robohash.org/${email}`}
                    >
                      M
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </motion.Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                TransitionComponent={Zoom}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => navigate("/settings")}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem
                  onClick={() => dispatch(setMode())}
                  sx={{ ml: "-2px" }}
                >
                  <ListItemIcon>
                    {theme.palette.mode === "light" ? (
                      <DarkModeOutlined />
                    ) : (
                      <LightModeOutlined />
                    )}
                  </ListItemIcon>
                  {theme.palette.mode === "dark" ? "Light mode" : "Dark mode"}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          </FlexBetween>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;

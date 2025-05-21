import { useEffect } from "react";
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
} from "@mui/material";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  LogoutOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import { APP_VERSION } from "data";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isAuthenticated = useSelector(
    (state) => state.authentication.authenticated
  );

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
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
        <FlexBetween gap="1.5rem">
          <div>v{APP_VERSION}</div>
          {/* <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkModeOutlined sx={{ fontSize: '25px' }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: '25px' }} />
            )}
          </IconButton> */}

          {/* <IconButton onClick={handleLogout}>
            <LogoutOutlined sx={{ fontSize: '25px' }} />
          </IconButton> */}
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

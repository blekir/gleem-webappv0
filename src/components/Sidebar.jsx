import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Avatar,
  Button,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  CreateOutlined,
  ModelTrainingOutlined,
  GroupOutlined,
  SummarizeOutlined,
  LogoutOutlined,
  AnalyticsOutlined,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { currentUser, logout } from "state/auth";
import { SIDEBAR_MENU_ITEMS } from "data";

function stringToColor(string) {
  let hash = 0;
  let i;
  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
}

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  const { email, isAdmin, user_id, authenticated } = useSelector(
    (state) => state.authentication
  );

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,

            "& .MuiDrawer-paper": {
              color: theme.palette.secondary,
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  gap="0.5rem"
                >
                  <Typography variant="h4" fontWeight="bold">
                    GLEEM
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {SIDEBAR_MENU_ITEMS.map(({ name, icon }) => {
                return (
                  <ListItem key={name} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${name}`);
                        setActive(name);
                      }}
                      sx={{
                        backgroundColor:
                          active === name
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === name
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === name
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={name} />
                      {active === name && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box position="absolute" bottom="1rem">
            <Divider variant="middle" />
            <FlexBetween m="1.5rem 2rem 0 3rem" gap="1rem">
              <Avatar src={`https://i.pravatar.cc/100?u=${email}`} />
              <Typography>{email}</Typography>
            </FlexBetween>
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              paddingTop="20px"
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ alignSelf: "center", width: "200px" }}
                onClick={handleLogout}
                startIcon={<LogoutOutlined sx={{ fontSize: "25px" }} />}
              >
                LOG OUT
              </Button>
            </Box>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;

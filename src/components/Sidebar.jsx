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
  Stack,
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

import logo from "../assets/logo_big.png";

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

  const { email, balance, id, authenticated } = useSelector(
    (state) => state.authentication.user
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
          variant={isNonMobile ? "persistent" : "temporary"}
          anchor="left"
          sx={{
            width: drawerWidth,

            "& .MuiDrawer-paper": {
              color: theme.palette.secondary,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.primary[900]
                  : "#ffffff",

              boxSizing: "border-box",
              // borderWidth: isNonMobile ? 1 : "2px",
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.background[70]}`,
            },
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "column" }}
            spacing={{ xs: 0.5, sm: 2, md: 3 }}
            useFlexGap
            sx={{
              height: "100%",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box width="100%">
              <Box m="1.5rem 2rem 8rem 1.5rem">
                {/* <FlexBetween color={theme.palette.secondary.main}> */}
                <FlexBetween>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    gap="0.5rem"
                  >
                    <img
                      src={logo}
                      alt="GLEEM AI"
                      width="auto"
                      height="30px"
                    ></img>
                  </Box>
                  {!isNonMobile && (
                    <IconButton
                      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                      <ChevronLeft />
                    </IconButton>
                  )}
                </FlexBetween>
                {/* </FlexBetween> */}
              </Box>
              <List>
                {SIDEBAR_MENU_ITEMS.map(({ name, icon, url }) => {
                  return (
                    <ListItem key={name} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate(`/${url}`);
                          setActive(url);
                        }}
                        disableRipple
                        sx={{
                          backgroundColor:
                            active === url
                              ? theme.palette.primary[900]
                              : "transparent",
                          color:
                            active === url
                              ? theme.palette.primary[1000]
                              : theme.palette.secondary[100],
                          "&:hover": {
                            backgroundColor:
                              active === url
                                ? theme.palette.primary[700]
                                : theme.palette.background.main,
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: "1rem",
                            color:
                              active === url
                                ? theme.palette.primary[1000]
                                : theme.palette.secondary[100],
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={name}
                          primaryTypographyProps={{
                            sx: {
                              fontFamily: "Inter",
                              color:
                                active === url
                                  ? theme.palette.primary[1000]
                                  : theme.palette.secondary[100],
                              fontWeight: active === url ? 900 : 500, // changed font weight
                            },
                          }}
                        />

                        {active === url && (
                          <ChevronRightOutlined
                            sx={{
                              ml: "auto",
                              color:
                                active === url
                                  ? theme.palette.primary[1000]
                                  : theme.palette.secondary[200],
                            }}
                          />
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Stack>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;

/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import useLatestDeployment from "./useLatestDeployment";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const prevIsNonMobile = useRef(isNonMobile);

  const {
    error,
    newDeployment,
    setNewDeployment,
    newVersionAvailable,
    versionNumber,
  } = useLatestDeployment();

  // Close sidebar when transitioning from desktop to mobile
  useEffect(() => {
    if (prevIsNonMobile.current && !isNonMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
    prevIsNonMobile.current = isNonMobile;
  }, [isNonMobile, isSidebarOpen]);

  const handleClose = () => {
    setNewDeployment(false);
  };

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Snackbar
        open={newDeployment}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          zIndex: "99999",
          whiteSpace: "pre-line",
        }}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          <p style={{ fontWeight: "Bold", fontSize: "16px" }}>
            New deployment available:
          </p>
          <p>{versionNumber}</p>
          <br />
          <p>Refresh the page to load new version.</p>
        </Alert>
      </Snackbar>
      <Sidebar
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;

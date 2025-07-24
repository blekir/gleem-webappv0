import { Box } from "@mui/material";
import React from "react";

const InnerFrame = ({ children, height = "500px" }) => {
  return (
    <Box
      sx={{
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.50)",
        background: "rgba(255, 255, 255, 0.30)",
        padding: "10px 0px 12px 0px",

        overflowY: "auto",
        maxWidth: "100%",
        position: "relative",
        transition: "box-shadow 0.3s, background 0.3s",
        height: height,
        marginTop: "20px",
      }}
    >
      {children}
    </Box>
  );
};

export default InnerFrame;

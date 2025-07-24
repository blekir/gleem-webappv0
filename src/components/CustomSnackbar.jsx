import React from "react";
import { SnackbarContent } from "notistack";
import { Box, Paper, Typography, useTheme } from "@mui/material";

// Use forwardRef and forward style/other props
export const CustomSnackbar = React.forwardRef(function CustomSnackbar(
  props,
  ref
) {
  const { id, message, imgSrc, url, style, ...other } = props;

  const theme = useTheme();

  return (
    <SnackbarContent
      ref={ref}
      style={style}
      role="alert"
      {...other}
      onClick={() => window.open(url, "_blank")}
    >
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          backgroundColor: "#43a047",
          padding: "10px 20px",
          borderRadius: "5px",
        }}
      >
        <img
          src={imgSrc}
          alt="thumb"
          style={{ width: 64, height: 64, borderRadius: 8, marginRight: 12 }}
        />
        <Typography sx={{ color: "#fff" }}>{message}</Typography>
      </Paper>
    </SnackbarContent>
  );
});

import { CheckCircle } from "@mui/icons-material";
import { Paper, useTheme } from "@mui/material";
import React from "react";

const SelectionMark = ({ children }) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={3}
      sx={{
        position: "absolute",
        bottom: 0,
        right: 0,
        bgcolor: theme.palette.yellows[700], // Use theme blue, or 'blue' for plain CSS
        color: "white",
        px: 2.2,
        py: 2.2,
        borderRadius: "25px 0px 5px 0px",
        fontWeight: "bold",
        fontSize: "12px",
        zIndex: 10,
        userSelect: "none",
      }}
    >
      <CheckCircle
        sx={{
          color: "#fff",
          fontSize: "25px",
          position: "absolute",
          bottom: "4px",
          right: "4px",
          zIndex: 10,
        }}
      />
    </Paper>
  );
};

export default SelectionMark;

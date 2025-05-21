import { Box } from "@mui/material";
import React from "react";

const FlexRow = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      width="100% "
      gap="10px"
    >
      {children}
    </Box>
  );
};

export default FlexRow;

import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

const PromptTokens = ({ species }) => {
  const [tokens, settokens] = useState([]);
  const animals = [
    "%Age%",
    "(%Fur colors%:0)",
    "(Detailed %Eye color% eyes:0)",
  ];
  const humans = ["%Age%", "%Ethnicity%", "%Eyes color% eyes"];

  useEffect(() => {
    if (species === "human") {
      settokens(humans);
    } else {
      settokens(animals);
    }
  }, [species]);

  const copyToClipboard = (token) => {
    navigator.clipboard.writeText(token);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "left",
        alignItems: "flex-start",
        gap: "3px",
        marginTop: "20px",
      }}
    >
      {tokens.map((token, index) => {
        return (
          <Button
            variant="contained"
            size="small"
            disableElevation
            onClick={() => copyToClipboard(token)}
            key={index}
          >
            {token}
          </Button>
        );
      })}
    </Box>
  );
};

export default PromptTokens;

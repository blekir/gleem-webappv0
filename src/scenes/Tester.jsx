import { useState } from "react";

import { useSnackbar, closeSnackbar } from "notistack";

import { CustomSnackbar } from "components/CustomSnackbar";
import { Button, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

const Tester = () => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  // const user = useSelector((state) => state.auth.)

  function test() {
    enqueueSnackbar("Order completed! Click to view.", {
      content: (key, message) => (
        <CustomSnackbar
          imgSrc="https://rest-as.garagefarm.net/images/f784aec4f8dc416e9f36066a12b814f1/0"
          message={message}
          url={`orders/${"993b6196a3724544ac6abe40476ab21e"}`}
          onClose={() => closeSnackbar(key)}
        />
      ),
      autoHideDuration: 6000,
    });
  }

  function test2() {
    enqueueSnackbar("Order placed!", {
      variant: "success",
    });
  }
  return (
    <div>
      <Button variant="contained" onClick={test}>
        TEST
      </Button>
      <Button variant="contained" onClick={test2}>
        TEST2
      </Button>
      <Typography sx={{ color: theme.palette.primary.white }}>
        TEST FONT{" "}
      </Typography>
    </div>
  );
};

export default Tester;

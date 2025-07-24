import { useState, forwardRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Backdrop, Box, IconButton, useTheme } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MediumDialog({
  children,
  title,
  content,
  open,
  setOpen,
  setData,
  confirmButton,

  blocked,
  cancelButton = "",
  fullwidth = true,
  maxwidth = "md",
}) {
  const theme = useTheme();
  const handleClose = (save) => {
    console.log(`save: ${save}`);
    setOpen(false);
    save ? setData(true) : setData(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
        fullWidth={fullwidth}
        maxWidth={maxwidth}
        sx={{
          backdropFilter: "blur(2px)",
          "& .MuiDialog-paper": {
            backgroundColor: theme.palette.background.default, // Change background color here
          },
        }}
      >
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <DialogTitle>{title}</DialogTitle>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              "&:hover": {
                backgroundColor: "rgb(0,0,0,0)",
              },
            }}
          >
            <CloseOutlined />
          </IconButton>
        </Box>

        <DialogContent sx={{ overflow: "hidden" }}>
          <DialogContentText>{content}</DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          {cancelButton !== "" && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleClose(false)}
            >
              {cancelButton}
            </Button>
          )}
          {confirmButton !== "" && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleClose(true)}
              disabled={blocked}
            >
              {confirmButton}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

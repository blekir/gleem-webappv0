import { useState, forwardRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Backdrop, IconButton, Stack, useTheme } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SmallDialog({
  children,
  title,
  open,
  setOpen,
  setClose,
  content = "",
  setData = false,
  confirmButton = "",
  cancelButton = "",
  blocked = false,
  fullwidth = true,
  maxwidth = "lg",
  height = "90vh",
  borderRadius = "40px",
}) {
  const theme = useTheme();
  const handleClose = (save) => {
    console.log(`save: ${save}`);
    setOpen(false);
    setClose();
    save ? setData(true) : setData(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={setClose}
        TransitionComponent={Transition}
        fullWidth={fullwidth}
        maxWidth={maxwidth}
        sx={{
          backdropFilter: "blur(2px)",

          "& .MuiDialog-paper": {
            height: height,
            borderRadius: borderRadius,
            backgroundColor: theme.palette.background.default, // Change background color here
          },
        }}
      >
        <DialogTitle>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 0.5, sm: 1, md: 1 }}
            useFlexGap
            sx={{
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {typeof title === "string" ? (
              <DialogTitle>{title}</DialogTitle>
            ) : (
              title
            )}

            <IconButton
              onClick={() => handleClose(false)}
              sx={{
                "&:hover": {
                  backgroundColor: "rgb(0,0,0,0)",
                },
                marginRight: "10px",
                order: { xs: -1, sm: 0 },
              }}
            >
              <CloseOutlined />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ height: "90vh" }}>
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

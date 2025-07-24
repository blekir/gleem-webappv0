import React, { forwardRef } from "react";
import {
  Dialog,
  useTheme,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { DialogTitle, DialogContentText } from "@mui/material";
import { Stack } from "@mui/material";
import { IconButton } from "@mui/material";
import { Slide } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmActionDialog = ({ title, content, open, setOpen, onConfirm }) => {
  const theme = useTheme();

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
        fullWidth={true}
        maxWidth="sm"
        sx={{
          backdropFilter: "blur(2px)",

          "& .MuiDialog-paper": {
            height: "20vh",
            borderRadius: "20px",
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
              onClick={() => setOpen(false)}
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
        <DialogContent
          sx={{
            height: "auto",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DialogContentText sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ marginRight: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: theme.palette.grey[600],
              "&:hover": {
                backgroundColor: theme.palette.grey[700],
              },
            }}
            onClick={() => setOpen(false)}
          >
            No
          </Button>

          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: theme.palette.yellows[700],
              "&:hover": {
                backgroundColor: theme.palette.yellows[800],
              },
            }}
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmActionDialog;

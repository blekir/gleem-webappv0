import { useState, forwardRef, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  Backdrop,
  Box,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { CloseOutlined, ArrowBackIosNew } from "@mui/icons-material";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

// Change the Slide transition speed by setting the timeout prop
const Transition = forwardRef(function Transition(props, ref) {
  return (
    <Slide
      direction="up"
      easing={{ enter: "ease-in-out" }}
      ref={ref}
      {...props}
    />
  );
});

export default function SteppedDialog({
  children,
  title,
  content,
  open,
  setOpen,
  setData,
  steps,
  activeStep,
  setActiveStep,
  disableNext,
  fullwidth = true,
  maxwidth = "md",
}) {
  const theme = useTheme();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
        fullWidth={fullwidth}
        maxWidth={maxwidth}
        scroll="paper"
        sx={{
          backdropFilter: "blur(2px)",
          "& .MuiDialog-paper": {
            backgroundColor: theme.palette.background.default,
            height: "100vh",
            borderRadius: "26px",
          },
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 0.5, sm: 1, md: 1 }}
          useFlexGap
          sx={{
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              px: 2,
              minHeight: 64,
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", flex: "0 0 auto" }}
            >
              {activeStep > 0 ? (
                <IconButton
                  onClick={handleBack}
                  sx={{
                    "&:hover": { backgroundColor: "rgb(0,0,0,0)" },
                  }}
                >
                  <ArrowBackIosNew />
                </IconButton>
              ) : (
                <Box sx={{ width: 40 }} />
              )}
            </Box>
            <DialogTitle
              sx={{
                flex: "1 1 auto",
                textAlign: "center",
                m: 0,
                p: 0,
                fontWeight: 700,
                fontSize: "1.25rem",
                lineHeight: 1.2,
                fontFamily: "Space Grotesk",
              }}
            >
              {title}
            </DialogTitle>
            <Box
              sx={{ display: "flex", alignItems: "center", flex: "0 0 auto" }}
            >
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
          </Box>
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 0.5, sm: 1, md: 1 }}
          useFlexGap
          sx={{ flexWrap: "wrap", justifyContent: "center" }}
        >
          <Stepper
            activeStep={activeStep}
            sx={{
              "& .MuiStepIcon-root": { color: "gray" }, // Default
              "& .MuiStepIcon-root.Mui-active": { color: "blue" }, // Active
              "& .MuiStepIcon-root.Mui-completed": { color: "green" }, // Completed
            }}
          >
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Stack>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={handleNext}
              disabled={disableNext}
              variant="contained"
              color="primary"
              sx={{
                background:
                  activeStep === steps.length - 1
                    ? "#0427C5"
                    : "rgba(0, 0, 0, 0.80)",
                borderRadius: "40px",
                width: "20%",
                height: "40px",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "1.2",
                letterSpacing: "0.15px",
                textTransform: "none",
                "&:hover": {
                  background:
                    activeStep === steps.length - 1
                      ? "rgba(4, 39, 197, 0.9)"
                      : "rgba(0, 0, 0, 0.70)",
                },
                marginBottom: "30px",
                marginTop: "20px",
              }}
            >
              {activeStep === steps.length - 1
                ? "Generate".toUpperCase()
                : "Next".toUpperCase()}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}

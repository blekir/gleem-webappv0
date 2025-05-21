import { useState, forwardRef, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ImageDialog({ images, open, setOpen, index }) {
  const [idx, setidx] = useState(index);

  useEffect(() => {
    open && setidx(index);

    console.log(images);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  const changeImage = (v) => {
    if (idx + v > images.length - 1) {
      setidx(0);
    } else if (idx + v < 0) {
      setidx(images.length - 1);
    } else {
      setidx((current) => current + v);
    }
  };

  const handleKeyPress = (key) => {
    if (key === "ArrowLeft") {
      changeImage(-1);
    }
    if (key === "ArrowRight") {
      changeImage(1);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        fullWidth={true}
        maxWidth="xl"
        onKeyDown={(e) => handleKeyPress(e.key)}
        // sx={{ padding: '0px' }}
      >
        {/* <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{ position: 'fixed', right: '10px', top: '10px' }}
        >
          <CloseIcon />
        </IconButton> */}
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            height: "100vh",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => changeImage(-1)}
            aria-label="close"
            size="large"
          >
            <KeyboardArrowLeftIcon
              fontSize="inherit"
              sx={{ fontSize: "40px" }}
            />
          </IconButton>
          <img
            src={images[idx]}
            alt=""
            height="100%"
            style={{ objectFit: "cover" }}
          />
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => changeImage(1)}
            aria-label="close"
          >
            <KeyboardArrowRightIcon sx={{ fontSize: "40px" }} />
          </IconButton>
        </DialogContent>
      </Dialog>
    </div>
  );
}

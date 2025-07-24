import { useState, forwardRef, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, DialogTitle, Stack, useTheme } from "@mui/material";
import {
  CloseOutlined,
  Delete,
  Download,
  FiberManualRecord,
  Hd,
  ShareOutlined,
} from "@mui/icons-material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ImageDialog({ images, open, setOpen, index, title }) {
  const theme = useTheme();
  const [idx, setidx] = useState(index);

  useEffect(() => {
    open && setidx(index);
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

  const handleDotClick = (index) => {
    setidx(index);
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
            {title}
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
        <DialogContent sx={{ overflow: "hidden" }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 0.5, sm: 1, md: 1 }}
            useFlexGap
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              width: "100%",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => changeImage(-1)}
              aria-label="previous"
              size="large"
              sx={{ alignSelf: "center", minWidth: 48 }}
            >
              <KeyboardArrowLeftIcon sx={{ fontSize: "40px" }} />
            </IconButton>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minWidth: 0,
              }}
            >
              <img
                src={images[idx]}
                alt=""
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  maxHeight: "900px",
                  display: "block",
                  borderRadius: 8,
                  objectFit: "cover",
                }}
              />
            </Box>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => changeImage(1)}
              aria-label="next"
              size="large"
              sx={{ alignSelf: "center", minWidth: 48 }}
            >
              <KeyboardArrowRightIcon sx={{ fontSize: "40px" }} />
            </IconButton>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={-1}
            sx={{ mt: 2 }}
          >
            {images.map((_, index) => (
              <IconButton
                key={index}
                size="small"
                onClick={() => handleDotClick(index)}
                sx={{
                  color:
                    index === idx ? theme.palette.yellows[700] : "grey.500",
                }}
              >
                <FiberManualRecord
                  fontSize={index === idx ? "medium" : "small"}
                />
              </IconButton>
            ))}
          </Stack>
          <ImageDialogButtons
            onUpscale={() => {}}
            onShare={() => {}}
            onDownload={() => {}}
            onDelete={() => {}}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export const ImageDialogButtons = ({
  onUpscale,
  onShare,
  onDownload,
  onDelete,
  color = "#666666",
  size = "large",
}) => {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      justifyContent="center"
      spacing={size === "large" ? 3 : 3}
      sx={{
        mt: size === "large" ? 2 : 1,
        zIndex: 1000,
        width: "100%",
      }}
    >
      {/* UPSCALE */}
      <IconButton
        size={size}
        sx={{
          display: "flex",
          flexDirection: "column",
          "&:hover": {
            backgroundColor: "rgb(0,0,0,0)",
          },
          "&:hover , &:hover .icon-svg": {
            color:
              color === "#666666"
                ? theme.palette.yellows[700]
                : "rgba(255, 255, 255, 0.8)",
          },
          " &:hover .icon-svg": {
            transition: "transform 0.2s",
            transform: "scale(1.05)",
            color:
              color === "#666666"
                ? theme.palette.yellows[700]
                : "rgba(255, 255, 255, 0.8)",
          },
        }}
        onClick={onUpscale}
      >
        <Hd fontSize="inherit" className="icon-svg" sx={{ color: color }} />
        <Typography
          className="icon-label"
          color={color}
          sx={{ fontSize: size === "large" ? "12px" : "10px" }}
        >
          upscale
        </Typography>
      </IconButton>

      {/* SHARE */}
      {/* <IconButton
        size={size}
        sx={{
          display: "flex",
          flexDirection: "column",
          "&:hover": {
            backgroundColor: "rgb(0,0,0,0)",
          },
          "&:hover, &:hover .icon-svg": {
            color:
              color === "#666666"
                ? theme.palette.yellows[700]
                : "rgba(255, 255, 255, 0.8)",
          },
          " &:hover .icon-svg": {
            transition: "transform 0.2s",
            transform: "scale(1.05)",
            color:
              color === "#666666"
                ? theme.palette.yellows[700]
                : "rgba(255, 255, 255, 0.8)",
          },
        }}
        onClick={onShare}
      >
        <ShareOutlined
          fontSize="inherit"
          className="icon-svg"
          sx={{ color: color }}
        />
        <Typography
          className="icon-label"
          color={color}
          sx={{ fontSize: size === "large" ? "12px" : "10px" }}
        >
          share
        </Typography>
      </IconButton> */}
      <IconButton
        size={size}
        sx={{
          display: "flex",
          flexDirection: "column",
          "&:hover": {
            backgroundColor: "rgb(0,0,0,0)",
          },
          "&:hover , &:hover .icon-svg": {
            color:
              color === "#666666"
                ? theme.palette.yellows[700]
                : "rgba(255, 255, 255, 0.8)",
          },
          " &:hover .icon-svg": {
            transition: "transform 0.2s",
            transform: "scale(1.05)",
            color:
              color === "#666666"
                ? theme.palette.yellows[700]
                : "rgba(255, 255, 255, 0.8)",
          },
        }}
        onClick={onDownload}
      >
        <Download
          fontSize="inherit"
          className="icon-svg"
          sx={{ color: color }}
        />
        <Typography
          className="icon-label"
          color={color}
          sx={{ fontSize: size === "large" ? "12px" : "10px" }}
        >
          download
        </Typography>
      </IconButton>
      <IconButton
        size={size}
        sx={{
          display: "flex",
          flexDirection: "column",
          "&:hover": {
            backgroundColor: "rgb(0,0,0,0)",
          },
          "&:hover, &:hover .icon-svg": {
            color:
              color === "#666666"
                ? theme.palette.yellows[700]
                : "rgba(255, 255, 255, 0.8)",
          },
          " &:hover .icon-svg": {
            transition: "transform 0.2s",
            transform: "scale(1.05)",
            color:
              color === "#666666"
                ? theme.palette.yellows[700]
                : "rgba(255, 255, 255, 0.8)",
          },
        }}
        onClick={onDelete}
      >
        <Delete fontSize="inherit" className="icon-svg" sx={{ color: color }} />
        <Typography
          className="icon-label"
          color={color}
          sx={{ fontSize: size === "large" ? "12px" : "10px" }}
        >
          delete
        </Typography>
      </IconButton>
    </Stack>
  );
};

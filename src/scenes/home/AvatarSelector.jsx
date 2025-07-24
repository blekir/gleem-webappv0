import { useState, useEffect, memo } from "react";

import { useGetLorasQuery } from "api/apiSlice";

import {
  AccessTime,
  CheckCircle,
  Image,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";

import BlurhashImage from "components/BlurhashImage";

import { useSelector } from "react-redux";
import zIndex from "@mui/material/styles/zIndex";
import AvatarCreator from "./AvatarCreator";
import SelectionMark from "components/SelectionMark";

import quick from "../../assets/icons/quick.svg";
import normal from "../../assets/icons/normal.svg";
import InnerFrame from "components/InnerFrame";
import pro from "../../assets/icons/pro.svg";
import credits from "../../assets/icons/credits_bw.svg";
import photo_bw from "../../assets/icons/photo_bw.svg";
import time_bw from "../../assets/icons/time.svg";

const SLIDE_DURATION = 400;

// Memoized BlurhashImage to prevent unnecessary reloads
const MemoBlurhashImage = memo((props) => <BlurhashImage {...props} />);

const AvatarSelector = ({ selectedLora, setselectedLora }) => {
  const theme = useTheme();
  const { data, error, isLoading } = useGetLorasQuery();

  const [loras, setloras] = useState([]);

  const { species, gender } = useSelector((state) => state.global);
  useEffect(() => {
    if (data?.data) {
      setloras(
        data.data.filter(
          (lora) => lora.gender === gender && lora.species === species
        )
      );
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <>
      {loras.length > 0 && (
        <InnerFrame>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            padding="10px 0px 12px 0px"
          >
            <Typography
              sx={{ fontWeight: "700", color: theme.palette.grey[600] }}
            >
              Select one of the avatars to use in the photo.
            </Typography>
          </Box>

          <Box
            sx={{
              width: "100%",
              overflow: "hidden",
              position: "relative",
              px: 2,
              mb: 2,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            {loras.map((lora, index) => (
              <Paper
                key={lora._id || lora.name}
                elevation={6}
                sx={{
                  flex: "0 0 200px",
                  minWidth: 0,

                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",

                  borderRadius: "9px",
                  overflow: "hidden",
                  p: 0,
                  "&:hover": {
                    transform: "scale(1.03)",
                    cursor: "pointer",
                  },
                  scale: lora.name === selectedLora ? 1.05 : 1,
                }}
                onClick={() =>
                  setselectedLora((current) =>
                    current !== lora.name ? lora.name : ""
                  )
                }
              >
                <BlurhashImage
                  key={index}
                  src={lora.image}
                  blurhash={lora.blurhash}
                  alt="sample"
                  width="200px"
                  height="200px"
                  style={{ borderRadius: "5px", objectFit: "cover" }}
                ></BlurhashImage>
                {lora.name === selectedLora && <SelectionMark />}

                <Paper
                  elevation={13}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    background:
                      lora.lora_type === "PRO"
                        ? "linear-gradient(91deg, rgba(191, 5, 207, 0.90) 3.71%, #1A1AFD 100.42%)"
                        : lora.lora_type === "NORMAL"
                        ? "rgba(0, 122, 255, 1)"
                        : "rgba(191, 5, 207, 0.85)", // Use theme blue, or 'blue' for plain CSS

                    color: "white",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: "0px 9px 0px 9px",
                    fontWeight: "bold",
                    fontSize: "12px",
                    zIndex: 10,
                    userSelect: "none",
                  }}
                >
                  {lora.lora_type}
                </Paper>
              </Paper>
            ))}
          </Box>
        </InnerFrame>
      )}
      <>
        <>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            padding="5px 0px 40px 0px"
            mt="20px"
          >
            <Typography sx={{ fontWeight: "700" }}>
              {loras.length !== 0
                ? "Or create a new one"
                : "Create your avatar"}
            </Typography>
          </Box>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 0.5, sm: 2, md: 3 }}
            useFlexGap
            sx={{ flexWrap: "wrap", justifyContent: "center" }}
          >
            <Avatar
              name="quick"
              time="5"
              photos="1"
              selected={selectedLora === "quick" ? true : false}
              handleCreateAvatar={() => setselectedLora("quick")}
            />
            <Avatar
              name="normal"
              time="15"
              photos="4"
              selected={selectedLora === "normal" ? true : false}
              handleCreateAvatar={() => setselectedLora("normal")}
            />
            <Avatar
              name="pro"
              time="60"
              photos="7"
              selected={selectedLora === "pro" ? true : false}
              handleCreateAvatar={() => setselectedLora("pro")}
            />
          </Stack>
        </>
      </>
    </>
  );
};

export default AvatarSelector;

const Avatar = ({ name, time, photos, selected, handleCreateAvatar }) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={selected ? 9 : 6}
      sx={{
        position: name === "pro" ? "relative" : "relative",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.03)",
          cursor: "pointer",
        },

        width: "180px",
        height: "220px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "10px",
        borderRadius: "10px",
        transform: selected ? "scale(1.03)" : "scale(1)",

        py: 3,
      }}
      onClick={() => handleCreateAvatar(false)}
    >
      {name === "pro" && (
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            bgcolor: theme.palette.yellows[700], // Use theme blue, or 'blue' for plain CSS
            color: "white",
            px: 1.5,
            py: 0.5,
            borderRadius: "0px 12px 0px 12px",
            fontWeight: "bold",
            fontSize: "12px",
            zIndex: 10,
            userSelect: "none",
          }}
        >
          PRO
        </Paper>
      )}
      {selected && <SelectionMark />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          gap: "5px",
          mb: "15px",
        }}
      >
        <img
          src={name === "quick" ? quick : name === "normal" ? normal : pro}
          alt="avatar_icon"
          width="50px"
        ></img>
        <Typography
          sx={{
            fontWeight: "700",
            color:
              name === "quick"
                ? "rgba(191, 5, 207, 0.85)"
                : name === "normal"
                ? "rgba(0, 122, 255, 1)"
                : name === "pro"
                ? "transparent"
                : "rgba(255, 255, 255, 1)",
            background:
              name === "pro"
                ? "linear-gradient(91deg, rgba(191, 5, 207, 0.90) 3.71%, #1A1AFD 100.42%)"
                : "none",
            WebkitBackgroundClip: name === "pro" ? "text" : "unset",
            backgroundClip: name === "pro" ? "text" : "unset",
            WebkitTextFillColor: name === "pro" ? "transparent" : "unset",
          }}
        >
          {name.toUpperCase()}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <img src={time_bw} alt="time" width="15px"></img>
        <Typography sx={{ fontWeight: "500", fontSize: "12px" }}>
          {time} minutes
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <img src={photo_bw} alt="photos" width="15px"></img>
        <Typography sx={{ fontWeight: "500", fontSize: "12px" }}>
          {photos === "1" ? `${photos} photo` : `${photos} photos`}
        </Typography>
      </Box>
      {/* {name === "pro" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <img src={credits} alt="pro" width="15px"></img>
          <Typography sx={{ fontWeight: "500", fontSize: "12px" }}>
            {photos === "1" ? `${photos} photo` : `${photos} photos`}
          </Typography>
        </Box>
      )} */}
    </Paper>
  );
};

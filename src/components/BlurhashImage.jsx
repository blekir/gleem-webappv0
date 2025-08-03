import React, { useState } from "react";
import { Blurhash } from "react-blurhash";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/material";

export default function BlurhashImage({
  src,
  blurhash,
  width,
  height,
  ...props
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Box
      sx={{
        position: "relative",
        width,
        height: height === "auto" ? "auto" : height,
        minHeight: height === "auto" ? "200px" : undefined,
      }}
      className="blurhash-image"
    >
      {/* 1. Show Skeleton while Blurhash is not ready */}
      {!imageLoaded && (
        <Box
          variant="rectangular"
          width={width}
          height={height}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            borderRadius: "10px",
            zIndex: 1,
            backgroundColor: "rgba(141, 141, 141, 0.75)",
          }}
        />
      )}

      {/* 2. Show Blurhash until image is loaded */}
      {/* {!imageLoaded && blurhash && (
        <Blurhash
          hash={blurhash}
          width={"400px"}
          height={"200px"}
          resolutionX={32}
          resolutionY={32}
          punch={1}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            borderRadius: "10px",
            zIndex: 2,
          }}
        />
      )} */}

      {/* 3. Show Image */}
      <Box
        component="img"
        src={src}
        sx={{
          maxWidth: width,

          display: imageLoaded ? "block" : "none",
          position: "absolute",
          top: 0,
          left: 0,
          borderRadius: "10px",
          zIndex: 3,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        onLoad={() => {
          console.log("image loaded");
          setImageLoaded(true);
        }}
        alt=""
        // loading="lazy"
        {...props}
      />
    </Box>
  );
}

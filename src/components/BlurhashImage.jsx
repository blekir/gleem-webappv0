import React, { useState } from "react";
import { Blurhash } from "react-blurhash";
import Skeleton from "@mui/material/Skeleton";

export default function BlurhashImage({
  src,
  blurhash,
  width,
  height,
  ...props
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div style={{ position: "relative", width, height }}>
      {/* 1. Show Skeleton while Blurhash is not ready (optional, or remove) */}
      {!imageLoaded && (
        <Skeleton
          variant="rectangular"
          width={width}
          height={height}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            borderRadius: "10px",
            zIndex: 1,
          }}
        />
      )}

      {/* 2. Show Blurhash until image is loaded */}
      {!imageLoaded && (
        <Blurhash
          hash={blurhash}
          width={width}
          height={height}
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
      )}

      {/* 3. Show Image */}
      <img
        src={src}
        width={width}
        height={height}
        style={{
          display: imageLoaded ? "block" : "none",
          position: "absolute",
          top: 0,
          left: 0,
          borderRadius: "10px",
          zIndex: 3,
        }}
        onLoad={() => setImageLoaded(true)}
        alt=""
        loading="lazy"
        {...props}
      />
    </div>
  );
}

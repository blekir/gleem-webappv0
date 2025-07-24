import React, { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function LazyImageWithSkeleton({ src, alt, width, style }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box sx={{ position: "relative", width }}>
      {!loaded && (
        <Skeleton
          variant="rectangular"
          width={width}
          height={width}
          sx={{ borderRadius: "15px", position: "absolute", top: 0, left: 0 }}
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={width}
        style={{
          ...style,
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s",
          display: "block",
          objectFit: "cover",
        }}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)} // hide skeleton on error as well
      />
    </Box>
  );
}

import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import BlurhashImage from "components/BlurhashImage";
import { useLocation, useNavigate } from "react-router-dom";

const WIDTH = "240px";
const HEIGHT = "147px";
const Product = ({ data, custom }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`/product/${data._id}`);
  };

  return (
    <>
      <Box
        elevation={6}
        display="flex"
        flexDirection="column"
        gap="10px"
        maxWidth={custom ? "1100px" : WIDTH}
        minHeight={custom ? "424.92px" : HEIGHT}
        alignItems="center"
        sx={{
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.03)",
            cursor: "pointer",
          },
        }}
        onClick={handleClick}
      >
        <Box
          position="relative"
          width={custom ? "auto" : WIDTH}
          height={custom ? "424.92px" : HEIGHT}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BlurhashImage
            src={data.image}
            blurhash={data.blurhash}
            alt="thumbnail"
            width={custom ? "auto" : WIDTH}
            height={custom ? "424.92px" : HEIGHT}
            style={{ borderRadius: "10px" }}
          />
          {!custom && (
            <Typography
              sx={{
                color: "#FFF",
                textAlign: "center",
                fontFamily: '"Segoe UI"',
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
                position: "absolute",
                bottom: "12px",
                textShadow: "0 2px 8px rgba(0,0,0,0.25)",
                width: "100%",
                overflow: "visible",
                whiteSpace: "normal",
                textOverflow: "unset",
              }}
            >
              {data.display_name}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Product;

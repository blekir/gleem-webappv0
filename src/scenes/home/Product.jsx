import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import BlurhashImage from "components/BlurhashImage";
import { useLocation, useNavigate } from "react-router-dom";

const WIDTH = {
  xs: "305px",
  sm: "255px",
  md: "303px",
  lg: "350px",
  xl: "400px",
};

const HEIGHT = "auto";
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
        maxWidth={WIDTH}
        width="100%"
        minHeight={"100px"}
        alignItems="center"
        position="relative"
        sx={{
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.03)",
            cursor: "pointer",
          },
        }}
        onClick={handleClick}
      >
        <BlurhashImage
          src={`${data.image}?size=small`}
          blurhash={data.blurhash}
          alt="thumbnail"
          width={WIDTH}
          height={"200px"}
          style={{ borderRadius: "10px" }}
        />
        {!custom && (
          <>
            <Typography
              sx={{
                color: "#FFF",
                textAlign: "left",
                paddingLeft: "10px",
                fontFamily: '"Segoe UI"',
                fontSize: "1.2rem",
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
                zIndex: 1000,
              }}
            >
              {data.display_name}
            </Typography>
            <Box
              sx={{
                position: "absolute",
                bottom: "5px",
                left: "0px",
                width: "100%",
                height: "30%",
                borderRadius: "0px 0px 10px 10px",
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.49) 70%, rgba(0, 0, 0, 0.79) 100%)",
              }}
            ></Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Product;

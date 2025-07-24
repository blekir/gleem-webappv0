import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useGetProductsQuery } from "api/apiSlice";

import React, { Fragment } from "react";
import Product from "./Product";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import { useGlobalSpeciesGender } from "hooks/useGlobalSpeciesGender";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Products = () => {
  const theme = useTheme();
  // const species = useSelector((state) => state.global.species);
  // const gender = useSelector((state) => state.global.gender);
  const { species, gender, handleSetSpecies, handleSetGender } =
    useGlobalSpeciesGender();

  const { data, error, isLoading } = useGetProductsQuery({
    species: species,
    gender: gender,
  });

  if (isLoading)
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <CircularProgress />
          <Typography>Loading products...</Typography>
        </Box>
      </>
    );
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        gap="10px"
        justifyContent="center"
        alignItems="center"
        width="60vw"
      >
        <Filter
          species={species}
          gender={gender}
          handleSetSpecies={handleSetSpecies}
          handleSetGender={handleSetGender}
          position="flex-end"
        />
        {Object.keys(data.data).map((category, index) => (
          <Fragment key={index}>
            <Typography
              key={`t_${index}`}
              sx={{
                alignSelf: "flex-start",
                color: theme.palette.primary[300],
                fontFamily: "Space Grotesk",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "normal",
                letterSpacing: "-0.18px",
              }}
            >
              {category}
            </Typography>
            {/* <Box
              display="flex"
              flexDirection="row"
              gap="10px"
              marginBottom="20px"
              width="1000px"
              alignItems="center"
              justifyContent="center"
            > */}
            <Stack
              key={`s_${index}`}
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 0.5, sm: 1, md: 1 }}
              useFlexGap
              sx={{
                flexWrap: "wrap",
                justifyContent: "flex-start",
                alignItems: "center",
                marginBottom: "28px",
                width: "100%",
              }}
            >
              {data.data[category]
                .filter((product) => product.name !== "Custom")
                .map((product) => (
                  <Product key={product._id} data={product} custom={false} />
                ))}
            </Stack>
            {/* </Box> */}
            {/* {data.data[category]
              .filter((product) => product.name === "Custom")
              .map((product) => (
                <Product key={product._id} data={product} custom={true} />
              ))} */}
          </Fragment>
        ))}
      </Box>
    </>
  );
};

export default Products;

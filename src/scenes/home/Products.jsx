import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useGetProductsQuery } from "api/apiSlice";

import React, { Fragment, useEffect, useState } from "react";
import Product from "./Product";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import { useGlobalSpeciesGender } from "hooks/useGlobalSpeciesGender";
import AnimatedList from "components/AnimatedList";

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

  const [newData, setNewData] = useState({});

  useEffect(() => {
    if (data) {
      const maxItems = 5;
      const newData = {};
      Object.keys(data.data).forEach((category) => {
        const products = data.data[category];
        if (products.length <= maxItems) {
          newData[category] = products;
        } else {
          let i = 0;
          let chunkIndex = 0;
          while (i < products.length) {
            const chunk = products.slice(i, i + maxItems);
            const key =
              chunkIndex === 0 ? category : `${chunkIndex}_${category}`;
            newData[key] = chunk;
            i += maxItems;
            chunkIndex++;
          }
        }
      });
      setNewData(newData);
    }
  }, [data]);

  if (isLoading || !newData)
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

        <AnimatedList items={newData} displayScrollbar={false} />
      </Box>
    </>
  );
};

export default Products;

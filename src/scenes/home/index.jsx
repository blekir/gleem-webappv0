import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
import { Box } from "@mui/material";
import { useGetProductsQuery } from "api/apiSlice";

const Home = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDetailsOpen, setProductDetailsOpen] = useState(false);

  const species = useSelector((state) => state.global.species);
  const gender = useSelector((state) => state.global.gender);

  const { data: productsData } = useGetProductsQuery({
    species: species,
    gender: gender,
  });

  useEffect(() => {
    if (productId && productsData) {
      // Find the product in the data
      let foundProduct = null;
      Object.values(productsData.data).forEach((category) => {
        category.forEach((product) => {
          if (product._id === productId) {
            foundProduct = product;
          }
        });
      });

      if (foundProduct) {
        setSelectedProduct(foundProduct);
        setProductDetailsOpen(true);
      }
    }
  }, [productId, productsData]);

  const handleCloseProductDetails = () => {
    setProductDetailsOpen(false);
    setSelectedProduct(null);
    navigate("/create");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "auto",
          gap: "20px",
          height: "1000px",
          alignItems: "center",
          padding: "20px 20px",
        }}
      >
        <Products />
      </Box>

      {selectedProduct && (
        <ProductDetails
          data={selectedProduct}
          open={productDetailsOpen}
          setOpen={handleCloseProductDetails}
        />
      )}
    </>
  );
};

export default Home;

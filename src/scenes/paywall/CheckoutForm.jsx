import React, { useState, useCallback } from "react";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useCreateCheckoutSessionMutation } from "api/apiSlice";
import { useSelector } from "react-redux";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const stripePromise = loadStripe(
  "pk_test_51RdSFTJulmMITFp2kGkaSnJMccq2b3lQZRi0hIHNU6cZMLRQGD2uogOZCwPrmiskJ4KcJ2Uf71JUHSfo1m8dFq6A00xZLFrUWn"
);

const CheckoutForm = () => {
  const [searchParams] = useSearchParams();
  const email = useSelector((state) => state.authentication.user.email);
  const user_id = useSelector((state) => state.authentication.user.id);
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();
  const navigate = useNavigate();

  const type = searchParams.get("type");
  const product = searchParams.get("product");
  const origin = searchParams.get("origin");

  const fetchClientSecret = useCallback(() => {
    const data = {
      email: "test+location_PL@example.com",
      type,
      product,
      origin,
      user_id,
      product_info: {
        type: type === "subscription" ? type : "photopack",
        value: searchParams.get("value"),
      },
    };
    return createCheckoutSession(data)
      .unwrap()
      .then((data) => data.clientSecret);
  }, []);

  const options = {
    fetchClientSecret,
  };

  return (
    <Box
      id="checkout"
      sx={{ width: "100%", height: "90%", position: "relative" }}
    >
      <IconButton
        sx={{ position: "absolute", top: 0, left: "20%" }}
        onClick={() => {
          navigate(`${origin}`);
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </Box>
  );
};

export default CheckoutForm;

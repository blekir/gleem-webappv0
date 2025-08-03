import { Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";

import photo from "../../assets/photo.png";
import photocolor from "../../assets/photo_color.png";
import { useGetPromptCountQuery } from "api/apiSlice";
import { useSelector } from "react-redux";
import BuyMoreCredits from "components/BuyMoreCredits";
import { useLocation } from "react-router-dom";
import InnerFrame from "components/InnerFrame";

const GeneratePhotos = ({ selectedBatch, setselectedBatch, productId }) => {
  const location = useLocation();
  const { balance } = useSelector((state) => state.authentication.user);
  const theme = useTheme();

  const { species, gender } = useSelector((state) => state.global);
  const { data, error, isLoading } = useGetPromptCountQuery({
    productId: productId,
    species: species,
    gender: gender,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  const items = [
    `${data.data.prompt_count * 3} photos`,
    `${data.data.prompt_count * 4} photos`,
    `${data.data.prompt_count * 5} photos`,
  ];
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        padding="5px 0px 40px 0px"
      >
        <Typography sx={{ fontWeight: "700" }}>Generate photos</Typography>
      </Box>
      <Stack
        direction={{ xs: "column", sm: "column" }}
        spacing={{ xs: 0.5, sm: 2, md: 3 }}
        useFlexGap
        sx={{
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BuyMoreCredits location={location} />

        <InnerFrame>
          <>
            {items.filter(
              (item) => parseInt(item.replace(" photos", "")) < balance
            ).length !== 0 ? (
              <Typography
                sx={{
                  fontWeight: "400",
                  marginBottom: "40px",
                  maxWidth: "400px",
                  textAlign: "center",
                }}
              >
                Choose the number of photos to generate. All photos will be
                unique and each photo will cost 1 credit.
              </Typography>
            ) : (
              <Typography
                sx={{
                  fontWeight: "400",
                  marginBottom: "40px",
                  fontSize: "23px",
                  color: "red",
                }}
              >
                Insufficient funds
              </Typography>
            )}

            <Stack
              direction={{ xs: "column", sm: "column" }}
              spacing={{ xs: 0.5, sm: 1, md: 1 }}
              useFlexGap
              sx={{
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px 10px",
              }}
            >
              {items
                .filter(
                  (item) => parseInt(item.replace(" photos", "")) < balance
                )
                .map((item, index) => (
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor="#fff"
                    border={
                      selectedBatch.index === index
                        ? `2px solid ${theme.palette.yellows[700]}`
                        : "2px solid rgb(216, 216, 216)"
                    }
                    borderRadius="35px"
                    width={{ xs: "100%", sm: `${220 + (index + 1) * 10}px` }}
                    height={`${46}px`}
                    padding="20px 10px"
                    gap="10px"
                    sx={{
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform:
                          parseInt(item.replace(" photos", "")) > balance
                            ? "scale(1.0)"
                            : "scale(1.03)",
                        cursor:
                          parseInt(item.replace(" photos", "")) > balance
                            ? "revert"
                            : "pointer",
                      },
                    }}
                    onClick={() =>
                      setselectedBatch({
                        index: index,
                        batch_size:
                          parseInt(item.replace(" photos", "")) /
                          data.data.prompt_count,
                        batch: item.replace(" photos", ""),
                      })
                    }
                  >
                    <Typography sx={{ fontWeight: "600" }}>{item}</Typography>
                    <img
                      src={selectedBatch.index === index ? photocolor : photo}
                      alt="photo-icon"
                      width="20px"
                      style={{ marginTop: "-2px" }}
                    ></img>
                  </Box>
                ))}
            </Stack>
          </>
        </InnerFrame>
        {/* {selectedBatch.batch_size !== 0 && (
          <Typography
            sx={{ fontWeight: "600" }}
          >{`${selectedBatch.batch} credits will be deducted from your balance `}</Typography>
        )} */}
      </Stack>
    </>
  );
};

export default GeneratePhotos;

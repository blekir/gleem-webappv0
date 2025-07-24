import ManIcon from "@mui/icons-material/Man";
import PersonIcon from "@mui/icons-material/Person";
import PetsIcon from "@mui/icons-material/Pets";
import WomanIcon from "@mui/icons-material/Woman";
import {
  Box,
  Divider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import human from "../../assets/icons/human.svg";
import dog from "../../assets/icons/dog.svg";
import cat from "../../assets/icons/cat.svg";

const Filter = ({
  species,
  gender,
  handleSetSpecies,
  handleSetGender,
  position,
}) => {
  useEffect(() => {
    console.log(gender);
  }, [gender]);

  return (
    <Box
      display="inline-flex"
      height="44px"
      maxWidth="50%"
      alignItems="center"
      justifyContent="center"
      alignSelf="center"
      bgcolor="rgba(255, 255, 255, 0.3)"
      borderRadius="34px"
      overflow="hidden"
      border="1px solid rgba(255, 255, 255, 0.5)"
    >
      <ToggleButtonGroup
        value={species}
        exclusive
        onChange={handleSetSpecies}
        sx={{
          height: "100%",
          padding: "4px 4px",
          "& .MuiToggleButton-root": {
            border: "none",
            borderRadius: "38px",
            padding: "0 20px",
            height: "34px",
            color: "rgba(61, 71, 85, 0.8)",
            fontFamily: "Manrope, Helvetica",
            fontWeight: 500,
            fontSize: "16px",
            letterSpacing: "-0.32px",
            textTransform: "none",
            "&.Mui-selected": {
              backgroundColor: "rgba(255, 255, 255, 0.75)",
              color: "#3d4755",
              fontWeight: 700,
              boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.15)",
            },
          },
        }}
      >
        <ToggleButton value="human" aria-label="person" disableRipple>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box component="span">person</Box>
            <img src={human} alt="human" />
          </Stack>
        </ToggleButton>

        <ToggleButton value="dog" aria-label="dog" disableRipple>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box component="span">dog</Box>
            <img src={dog} alt="dog" />
          </Stack>
        </ToggleButton>

        <ToggleButton value="cat" aria-label="cat" disableRipple>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box component="span">cat</Box>
            <img src={cat} alt="cat" />
          </Stack>
        </ToggleButton>
      </ToggleButtonGroup>

      <Divider
        orientation="vertical"
        sx={{ height: "40px", bgcolor: "rgba(61, 71, 85, 0.3)" }}
      />

      <Stack
        direction="row"
        spacing={0.5}
        alignItems="center"
        sx={{
          width: "85px",
          height: "40px",
          padding: "0 4px 0 8px",
        }}
      >
        <ToggleButtonGroup
          value={gender}
          exclusive
          onChange={handleSetGender}
          aria-label="text alignment"
          sx={{
            height: "100%",
            padding: "4px 4px",
            "& .MuiToggleButton-root": {
              border: "none",
              borderRadius: "38px",
              padding: "0 10px",
              height: "34px",
              color: "rgba(61, 71, 85, 0.8)",
              fontFamily: "Manrope, Helvetica",
              fontWeight: 500,
              fontSize: "16px",
              letterSpacing: "-0.32px",
              textTransform: "none",
              gap: "10px",
              width: "34px", // Ensure min width for all toggles
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s, color 0.2s, font-weight 0.2s",
              "& .MuiSvgIcon-root": {
                margin: 0, // Prevent icon shifting
              },
              "&.Mui-selected": {
                backgroundColor: "rgba(255, 255, 255, 0.75)",
                color: "#3d4755",
                fontWeight: 700,
                boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.15)",
                borderRadius: "50%", // Make selected toggle perfectly round
                width: "34px", // Ensure width equals height for perfect circle
                minWidth: "34px",
                padding: 0,
                justifyContent: "center",
              },
            },
          }}
        >
          <ToggleButton value="male" aria-label="left aligned" disableRipple>
            <ManIcon />
          </ToggleButton>
          <ToggleButton value="female" aria-label="centered" disableRipple>
            <WomanIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Box>
  );
};

export default Filter;

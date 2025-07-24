import { useState } from "react";

import { Stack, useTheme } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { FemaleOutlined, MaleOutlined, Man, Woman } from "@mui/icons-material";
import { pink } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { setGender, setSpecies } from "state/global";

const Filter = ({
  species,
  gender,
  handleSetSpecies,
  handleSetGender,
  position,
}) => {
  const theme = useTheme();

  const toggle_sx = {
    border: "none",
    "&.Mui-selected": {
      backgroundColor: theme.palette.yellows[700],
      color: theme.palette.primary.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.yellows[600],
      },
    },
  };
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 0.5, sm: 1, md: 1 }}
      useFlexGap
      sx={{
        width: "100%",
        flexWrap: "wrap",
        justifyContent: position,
        alignItems: "center",
        marginBottom: "30px",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 0.5, sm: 1, md: 1 }}
        useFlexGap
        sx={{
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ToggleButtonGroup
          color="yellows"
          value={species}
          exclusive
          onChange={handleSetSpecies}
          aria-label="text alignment"
        >
          <ToggleButton value="human" aria-label="left aligned" sx={toggle_sx}>
            human
          </ToggleButton>
          <ToggleButton value="cat" aria-label="centered" sx={toggle_sx}>
            cat
          </ToggleButton>
          <ToggleButton value="dog" aria-label="right aligned" sx={toggle_sx}>
            dog
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 0.5, sm: 1, md: 1 }}
        useFlexGap
        sx={{
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ToggleButtonGroup
          value={gender}
          exclusive
          onChange={handleSetGender}
          aria-label="text alignment"
        >
          <ToggleButton value="male" aria-label="left aligned" sx={toggle_sx}>
            <Man />
          </ToggleButton>
          <ToggleButton
            value="female"
            aria-label="centered"
            sx={{
              ...toggle_sx,
              "&.Mui-selected": {
                backgroundColor: pink[400],
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: pink[300],
                },
              },
            }}
          >
            <Woman />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  );
};

export default Filter;

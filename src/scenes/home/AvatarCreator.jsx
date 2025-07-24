import { useTheme } from "@emotion/react";
import { Add } from "@mui/icons-material";
import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import Filter from "./Filter";
import { useGlobalSpeciesGender } from "hooks/useGlobalSpeciesGender";

const AvatarCreator = ({ type, images, setImages, maxFiles }) => {
  const theme = useTheme();

  const { species, gender } = useGlobalSpeciesGender();
  const [_species, setspecies] = useState(species);
  const [_gender, setgender] = useState(gender);

  // Main state for images

  const [selectedIndex, setSelectedIndex] = useState(null);

  const inputRef = useRef();

  // Handle file selection
  const onChange = async (e) => {
    const selectedFiles = Array.from(e.target.files).filter(
      (file) => file.type === "image/jpeg" || file.type === "image/png"
    );
    let newFiles = [...images];

    if (selectedFiles.length > 1) {
      let fileIdx = 0;
      for (let i = 0; i < maxFiles && fileIdx < selectedFiles.length; i++) {
        if (!newFiles[i]) {
          newFiles[i] = selectedFiles[fileIdx];
          fileIdx++;
        }
      }
    } else if (selectedFiles.length === 1 && selectedIndex !== null) {
      newFiles[selectedIndex] = selectedFiles[0];
    }

    setImages(newFiles);
    setSelectedIndex(null);
  };

  // Open dialog and track which box was clicked
  const openFileDialog = (idx) => {
    setSelectedIndex(idx);
    inputRef.current.value = "";
    inputRef.current.click();
  };

  const handleSetSpecies = (event, value) => {
    if (value !== null) setspecies(value);
  };

  const handleSetGender = (event, value) => {
    if (value !== null) setgender(value);
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        multiple
        style={{ display: "none" }}
        onChange={onChange}
      />
      <Stack
        direction={{ xs: "column", sm: "column" }}
        spacing={{ xs: 0.5, sm: 1, md: 1 }}
        useFlexGap
        sx={{ flexWrap: "wrap", justifyContent: "center", marginTop: "30px" }}
      >
        <Filter
          species={_species}
          gender={_gender}
          handleSetSpecies={handleSetSpecies}
          handleSetGender={handleSetGender}
          position={"center"}
        />

        <>
          <Box
            sx={{
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.50)",
              background: "rgba(255, 255, 255, 0.30)",
              padding: "10px 0px 12px 0px",

              overflowY: "auto",
              width: "auto",
              position: "relative",
              transition: "box-shadow 0.3s, background 0.3s",

              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              fontSize={{ xs: "0.8em", sm: "1em" }}
              sx={{ wordBreak: "break-word", marginTop: "20px" }}
            >
              Upload {maxFiles} {maxFiles === 1 ? "photo" : "photos"} to help us
              train AI and create your personalized AI Avatar{" "}
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 0.5, sm: 1, md: 1 }}
              useFlexGap
              width={{ xs: "auto", sm: "auto", md: "auto" }}
              sx={{
                flexWrap: "wrap",
                padding: "0px 10px 0px 10px",
                justifyContent: "flex-start",
                alignItems: "center",
                marginTop: "30px",
              }}
            >
              {images.map((file, idx) => (
                <Box
                  key={idx}
                  sx={{
                    width: 200,
                    height: 200,
                    borderRadius: "6px",
                    border: "1px solid rgba(0, 0, 0, 0.08)",
                    background: "rgba(255, 255, 255, 0.60)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    overflow: "hidden",
                    position: "relative",
                  }}
                  onClick={() => openFileDialog(idx)}
                >
                  {file ? (
                    <>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`uploaded-${idx}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          transition: "transform 0.3s ease",
                          "&:hover": {
                            cursor: "pointer",
                            transform: "scale(1.05)",
                            "& .MuiSvgIcon-root, & .MuiTypography-root": {
                              color: theme.palette.yellows[700],
                            },
                          },
                        }}
                      >
                        <Add
                          fontSize="large"
                          sx={{
                            color: theme.palette.grey[700],
                            fontWeight: 800,
                          }}
                        />
                        <Typography
                          sx={{
                            color: theme.palette.grey[700],
                            fontSize: "1rem",
                            fontWeight: 800,
                          }}
                        >
                          add photo
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        </>
      </Stack>
    </>
  );
};

export default AvatarCreator;

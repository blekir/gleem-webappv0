import { useTheme } from "@emotion/react";
import { Add } from "@mui/icons-material";
import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import Filter from "./Filter";
import { useGlobalSpeciesGender } from "hooks/useGlobalSpeciesGender";
import * as faceapi from "face-api.js";

const AvatarCreator = ({ type, setImages, maxFiles }) => {
  const theme = useTheme();

  const { species, gender } = useGlobalSpeciesGender();
  const [_species, setspecies] = useState(species);
  const [_gender, setgender] = useState(gender);

  // Main state for images
  const [files, setFiles] = useState(Array(maxFiles).fill(null));
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [faceDetections, setFaceDetections] = useState(
    Array(maxFiles).fill(null)
  );
  const [faceDetectionLoading, setFaceDetectionLoading] = useState(
    Array(maxFiles).fill(false)
  );
  const inputRef = useRef();

  // Load face-api.js model once
  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    };
    loadModels();
  }, []);

  // Helper function to detect face in a file
  const detectFaceInFile = async (file, idx) => {
    setFaceDetectionLoading((prev) => {
      const copy = [...prev];
      copy[idx] = true;
      return copy;
    });

    const hasFace = await new Promise((resolve) => {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.onload = async () => {
        const detections = await faceapi.detectAllFaces(
          img,
          new faceapi.TinyFaceDetectorOptions()
        );
        URL.revokeObjectURL(img.src);
        resolve(detections.length > 0);
      };
    });

    setFaceDetectionLoading((prev) => {
      const copy = [...prev];
      copy[idx] = false;
      return copy;
    });

    return hasFace;
  };

  // Handle file selection
  const onChange = async (e) => {
    const selectedFiles = Array.from(e.target.files).filter(
      (file) => file.type === "image/jpeg" || file.type === "image/png"
    );
    let newFiles = [...files];
    let newFaceDetections = [...faceDetections];

    if (selectedFiles.length > 1) {
      let fileIdx = 0;
      for (let i = 0; i < maxFiles && fileIdx < selectedFiles.length; i++) {
        if (!newFiles[i]) {
          newFiles[i] = selectedFiles[fileIdx];
          if (_species === "human") {
            newFaceDetections[i] = await detectFaceInFile(
              selectedFiles[fileIdx],
              i
            );
          } else {
            newFaceDetections[i] = null;
          }
          fileIdx++;
        }
      }
    } else if (selectedFiles.length === 1 && selectedIndex !== null) {
      newFiles[selectedIndex] = selectedFiles[0];
      if (_species === "human") {
        newFaceDetections[selectedIndex] = await detectFaceInFile(
          selectedFiles[0],
          selectedIndex
        );
      } else {
        newFaceDetections[selectedIndex] = null;
      }
    }

    setFiles(newFiles);
    setImages(newFiles);
    setFaceDetections(newFaceDetections);
    setSelectedIndex(null);
  };

  // Revalidate photos when species changes
  useEffect(() => {
    const validateAll = async () => {
      if (_species === "human" && files.some(Boolean)) {
        const newFaceDetections = await Promise.all(
          files.map(async (file, idx) => {
            if (!file) return null;
            return await detectFaceInFile(file, idx);
          })
        );
        setFaceDetections(newFaceDetections);
      } else {
        setFaceDetections(Array(maxFiles).fill(null));
      }
    };
    validateAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_species, files]);

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
        direction={{ xs: "column", sm: "row" }}
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
        {type === "quick" ? (
          <>QUICK</>
        ) : (
          <>
            <Typography
              fontSize={{ xs: "0.8em", sm: "1em" }}
              sx={{ wordBreak: "break-word" }}
            >
              Upload {maxFiles} photos to help us train AI and create your
              personalized AI Avatar{" "}
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 0.5, sm: 1, md: 1 }}
              useFlexGap
              width={{ xs: "auto", sm: 650, md: 650 }}
              sx={{
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "30px",
              }}
            >
              {files.map((file, idx) => (
                <Box
                  key={idx}
                  sx={{
                    width: 200,
                    height: 200,
                    backgroundColor: "#e4e4e4",
                    borderRadius: 2,
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
                  {faceDetectionLoading[idx] && (
                    <CircularProgress
                      size={40}
                      sx={{
                        position: "absolute",
                        top: "calc(50% - 20px)",
                        left: "calc(50% - 20px)",
                        zIndex: 2,
                        background: "rgba(255,255,255,0.7)",
                        borderRadius: "50%",
                      }}
                    />
                  )}
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
                      {_species === "human" && faceDetections[idx] === true && (
                        <Typography
                          sx={{
                            position: "absolute",
                            bottom: 8,
                            left: 8,
                            color: "green",
                            background: "rgba(255,255,255,0.7)",
                            borderRadius: 1,
                            px: 1,
                            fontWeight: 700,
                            fontSize: "0.9rem",
                          }}
                        >
                          Face detected
                        </Typography>
                      )}
                      {_species === "human" &&
                        faceDetections[idx] === false && (
                          <Typography
                            sx={{
                              position: "absolute",
                              bottom: 8,
                              left: 8,
                              color: "red",
                              background: "rgba(255,255,255,0.7)",
                              borderRadius: 1,
                              px: 1,
                              fontWeight: 700,
                              fontSize: "0.9rem",
                            }}
                          >
                            No face
                          </Typography>
                        )}
                    </>
                  ) : (
                    <>
                      <Add
                        fontSize="large"
                        sx={{
                          color: theme.palette.yellows[700],
                          fontWeight: 800,
                        }}
                      />
                      <Typography
                        sx={{
                          color: theme.palette.yellows[700],
                          fontSize: "1rem",
                          fontWeight: 800,
                        }}
                      >
                        add photo
                      </Typography>
                    </>
                  )}
                </Box>
              ))}
            </Stack>
          </>
        )}
      </Stack>
    </>
  );
};

export default AvatarCreator;

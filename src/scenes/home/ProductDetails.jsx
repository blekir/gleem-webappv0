import { useEffect, useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import { useSnackbar } from "notistack";

import BlurhashImage from "components/BlurhashImage";
import SteppedDialog from "components/SteppedDialog";
import AvatarSelector from "./AvatarSelector";
import GeneratePhotos from "./GeneratePhotos";
import {
  useBundleProductMutation,
  useGenerateProductMutation,
} from "api/apiSlice";
import AvatarCreator from "./AvatarCreator";
import { useGlobalSpeciesGender } from "hooks/useGlobalSpeciesGender";
import { useSSE } from "contexts/SSEContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deductCredits } from "state/auth";

const ProductDetails = ({ data, open, setOpen }) => {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const balance = useSelector((state) => state.authentication.user.balance);

  const { species, gender } = useGlobalSpeciesGender();
  const { nsfwFeedback } = useSSE();

  const [generateProduct] = useGenerateProductMutation();
  const [bundleProduct] = useBundleProductMutation();

  const [dialogData, setdialogData] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const [selectedLora, setselectedLora] = useState("");
  const [selectedBatch, setselectedBatch] = useState({
    batch: 0,
    batch_size: 0,
    index: -1,
  });
  const [disableNext, setdisableNext] = useState(false);

  const [maxFiles, setMaxFiles] = useState(7);
  const [images, setimages] = useState(Array(maxFiles).fill(null));

  const [bundleSubmitted, setbundleSubmitted] = useState(false);

  const steps =
    selectedLora !== "quick" &&
    selectedLora !== "normal" &&
    selectedLora !== "pro"
      ? ["Sample photos", "Select Avatar", "Select batch"]
      : ["Sample photos", "Select Avatar", "Create avatar", "Select batch"];

  const elements = {
    0: (
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}
        useFlexGap
        sx={{
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data.samples.map((img, index) => (
          <BlurhashImage
            key={index}
            src={img}
            blurhash={data.samples_blur[index]}
            alt="sample"
            width="220px"
            height="auto"
            style={{ borderRadius: "5px" }}
          ></BlurhashImage>
        ))}
      </Stack>
    ),
    1: (
      <AvatarSelector
        selectedLora={selectedLora}
        setselectedLora={setselectedLora}
      />
    ),
    2:
      selectedLora !== "quick" &&
      selectedLora !== "normal" &&
      selectedLora !== "pro" ? (
        <GeneratePhotos
          selectedBatch={selectedBatch}
          setselectedBatch={setselectedBatch}
          productId={data._id}
        />
      ) : (
        <AvatarCreator
          type={selectedLora}
          images={images}
          setImages={setimages}
          maxFiles={maxFiles}
        />
      ),
    3: (
      <GeneratePhotos
        selectedBatch={selectedBatch}
        setselectedBatch={setselectedBatch}
        productId={data._id}
      />
    ),
  };

  useEffect(() => {
    if (selectedLora) {
      setMaxFiles(
        selectedLora === "pro" ? 7 : selectedLora === "normal" ? 4 : 1
      );
      setimages(
        Array(
          selectedLora === "pro" ? 7 : selectedLora === "normal" ? 4 : 1
        ).fill(null)
      );
    }
  }, [selectedLora]);

  useEffect(() => {
    if (dialogData) {
      submitOrder();
    }
  }, [dialogData]);

  const submitOrder = async () => {
    if (
      selectedLora !== "quick" &&
      selectedLora !== "normal" &&
      selectedLora !== "pro"
    ) {
      const generateData = {
        product: data.name,
        lora: selectedLora,
        batch: selectedBatch.batch,
        batch_size: selectedBatch.batch_size,
        gender: gender,
        species: species,
      };
      try {
        const res = await generateProduct(generateData).unwrap();

        enqueueSnackbar("Order placed!", {
          variant: "success",
        });
        const newBalance = balance - parseInt(selectedBatch.batch);
        dispatch(deductCredits(newBalance));
        setdialogData(false);
      } catch {
        enqueueSnackbar("Insufficient funds", {
          variant: "error",
        });
      }
    } else {
      console.log("BUNDLE");
      const formData = new FormData();
      const _data = {
        name: "",
        gender: gender,
        species: species,
        product: data.name,
        batch: selectedBatch.batch,
        batch_size: selectedBatch.batch_size,
      };
      for (let i = 0; i < images.length; i++) {
        formData.append("files", images[i]);
      }
      formData.append("data", JSON.stringify(_data));

      // setbundleSubmitted(true);

      try {
        setbundleSubmitted(true);
        const resp = await bundleProduct(formData).unwrap();
        const newBalance = balance - parseInt(selectedBatch.batch);
        dispatch(deductCredits(newBalance));
      } catch {
        setbundleSubmitted(false);
      }
    }
    setActiveStep(0);
    setOpen(false);
  };

  useEffect(() => {
    if (activeStep == 0) {
      setdisableNext(false);
    } else if (activeStep === 1 && selectedLora === "") {
      setdisableNext(true);
    } else if (activeStep === 1 && selectedLora !== "") {
      setdisableNext(false);
    } else if (
      activeStep === 2 &&
      selectedLora !== "quick" &&
      selectedLora !== "pro" &&
      selectedBatch.index !== -1
    ) {
      setdisableNext(false);
    } else if (
      activeStep === 2 &&
      selectedLora !== "quick" &&
      selectedLora !== "pro" &&
      selectedBatch.index === -1
    ) {
      setdisableNext(true);
    } else if (
      activeStep === 2 &&
      (selectedLora === "quick" || selectedLora === "pro") &&
      images.some((element) => element === null) === false
    ) {
      console.log("all images uploaded", images);
      setdisableNext(false);
    } else if (
      activeStep === 2 &&
      (selectedLora === "quick" || selectedLora === "pro") &&
      images.some((element) => element === null) === true
    ) {
      setdisableNext(true);
    }
  }, [activeStep, selectedLora, selectedBatch, images]);

  useEffect(() => {
    if (
      activeStep === steps.length &&
      selectedLora !== "quick" &&
      selectedLora !== "normal" &&
      selectedLora !== "pro"
    ) {
      console.log("order");

      setdialogData(true);
    } else if (
      activeStep === steps.length &&
      (selectedLora === "quick" ||
        selectedLora === "normal" ||
        selectedLora === "pro")
    ) {
      console.log("bundle");
      submitOrder();
    }
  }, [activeStep]);

  useEffect(() => {
    setActiveStep(0);
  }, [open]);

  if (!data) return <CircularProgress />;

  return (
    <SteppedDialog
      title={data.name}
      open={open}
      setOpen={setOpen}
      setData={setdialogData}
      steps={steps}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
      disableNext={disableNext}
    >
      {!bundleSubmitted ? (
        elements[activeStep]
      ) : (
        <BundleVerify
          setbundleSubmitted={setbundleSubmitted}
          nsfwFeedback={nsfwFeedback}
          setActiveStep={setActiveStep}
        />
      )}
    </SteppedDialog>
  );
};

export default ProductDetails;

const BundleVerify = ({ setbundleSubmitted, nsfwFeedback, setActiveStep }) => {
  const [info, setinfo] = useState("uploading images");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setinfo("checking images");
    }, 5000); // Change after 3 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (nsfwFeedback.hasOwnProperty("nsfw_check_passed")) {
      if (nsfwFeedback.nsfw_check_passed) {
        console.log("passed");
        navigate("/orders");
      } else {
        console.log("not passed");
        setbundleSubmitted(false);
        setActiveStep((current) => current - 1);
      }
    }
  }, [nsfwFeedback]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="10px"
      height="300px"
    >
      <CircularProgress
        size={40}
        sx={{
          background: "rgba(255,255,255,0.7)",
          borderRadius: "50%",
        }}
      />
      {/* <Button onClick={() => setbundleSubmitted(false)}>BACK</Button> */}
      <Typography> {info}</Typography>
    </Box>
  );
};

import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useTheme,
  TextField,
} from "@mui/material";
import InnerFrame from "components/InnerFrame";
import React, { useEffect, useRef, useState } from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CopyAll } from "@mui/icons-material";
import { useSelector } from "react-redux";
import SimpleAccordion from "components/Accordian";
import SmallDialog from "components/SmallDialog";

import useRedeemCode from "./useRedeemCode";

const FAQ = {
  "How to take good photos?": [
    <p>
      Make sure you upload photos that are good quality. If the lighting of the
      photo is poor and your face is barely visible, then the quality of the
      avatar will go down too 😓.
    </p>,
    <p>
      It's important to use your best photos that have your face or your pet
      clearly visible and close enough to the camera! Also, for the best result,
      the photos you upload should have different backgrounds, different head
      angles if possible, and should have your face well-lit.
    </p>,
    <p>
      {" "}
      They don't have to be professional photos, though. It's enough to use your
      phone's camera.
    </p>,
  ],

  "What photos are best to use in AI Avatar training?": [
    <p>
      Good quality selfies from various angles and various environments. The
      better quality input photos are, the better photos AI will generate.
    </p>,
  ],
  "What is AI Avatar??": [
    <p>
      An AI Avatar, or also called AI Model, is your digital double in the Gleem
      app. It represents you (or even your pet) in the digital world..
    </p>,
    <p>
      You can create multiple avatars in Gleem. Each time you use a different
      set of photos, your avatar might look slightly different because the AI
      learns from the pictures you provide. The more and the better quality
      photos you give the AI, the better your avatar will look!
    </p>,
  ],
  "Does Gleem.AI  use my photos in AI model training?": [
    <p>
      Gleem.AI will process and use the photos uploaded by you to generate
      Avatars and Images. These photos will only be used for the sole purpose of
      generating Avatars and Images and not for any other purposes like training
      AI models, advertising, or third-party usage.
    </p>,
  ],
};

const Settings = () => {
  const { id: userId } = useSelector((state) => state.authentication.user);
  const theme = useTheme();
  const [showPromoCodeDialog, setShowPromoCodeDialog] = useState(false);
  const [promoCodeDialogData, setPromoCodeDialogData] = useState(null);
  const promoCodeRef = useRef(null);
  const { handleRedeemPromoCode } = useRedeemCode(promoCodeDialogData);

  useEffect(() => {
    if (promoCodeDialogData) {
      handleRedeemPromoCode(promoCodeRef.current?.value);
    }
  }, [promoCodeDialogData]);

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 0.5, sm: 2, md: "46px" }}
        useFlexGap
        sx={{
          flexWrap: "wrap",
          justifyContent: { xs: "center", md: "flex-start" },
          alignItems: { xs: "center", sm: "flex-start" },
          marginTop: "0px",
          padding: { xs: "20px", sm: "96px" },
        }}
      >
        <InnerFrame height="auto">
          <Box
            sx={{
              width: { xs: "80vw", md: "280px" },

              padding: "18px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.2rem",
                fontWeight: "700",
                color: theme.palette.primary[200],
                marginBottom: "22px",
              }}
            >
              Settings
            </Typography>
            <Stack direction="column" spacing={1.5}>
              <SettingsButton
                label="Contact support"
                onClick={() => {
                  window.open("mailto:support@gleem.ai", "_blank");
                }}
              />
              {/* <SettingsButton label="Share Feedback" /> */}
              <SettingsButton
                label="Redeem promo code"
                onClick={() => setShowPromoCodeDialog(true)}
              />
              <UserId userId={userId} />
              <SettingsButton label="Delete account" />
            </Stack>
          </Box>

          <ExtraLinks />
        </InnerFrame>
        <InnerFrame height="auto">
          <Box
            sx={{
              width: { xs: "80vw", md: "280px" },
              height: "auto",
              padding: "18px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.2rem",
                fontWeight: "700",
                color: theme.palette.primary[200],
                marginBottom: "22px",
              }}
            >
              FAQ
            </Typography>
            <Stack direction="column" spacing={1.5}>
              {Object.keys(FAQ).map((key) => (
                <SimpleAccordion title={key} key={key}>
                  <Box
                    variant="body1"
                    sx={{ fontSize: "0.8rem", fontWeight: "400" }}
                  >
                    {FAQ[key]}
                  </Box>
                </SimpleAccordion>
              ))}
            </Stack>
          </Box>
        </InnerFrame>
      </Stack>
      <SmallDialog
        open={showPromoCodeDialog}
        setOpen={setShowPromoCodeDialog}
        setClose={() => setShowPromoCodeDialog(false)}
        setData={setPromoCodeDialogData}
        title=""
        confirmButton="Redeem"
        onClose={() => setShowPromoCodeDialog(false)}
        maxwidth="sm"
        height="auto"
        borderRadius="20px"
      >
        <Stack
          direction="column"
          spacing={2}
          padding="20px"
          display="flex"
          alignItems="center"
        >
          <TextField
            sx={{ width: "80%" }}
            label="Promo code"
            inputRef={promoCodeRef}
          />
        </Stack>
      </SmallDialog>
    </>
  );
};

export default Settings;

const SettingsButton = ({ label, onClick }) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        display: "flex",
        padding: "10px 12px",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "stretch",
        borderRadius: "6px",
        border: "1px solid rgba(255, 255, 255, 0.30)",
        background: "rgba(255, 255, 255, 0.30)",
        transition: "transform 0.15s ease, background 0.15s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.04)",
          background: "rgba(255, 255, 255, 0.45)",
        },
      }}
      onClick={onClick}
    >
      <Typography variant="body1" sx={{ fontSize: "1rem", fontWeight: "400" }}>
        {label}
      </Typography>
      <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
    </Stack>
  );
};

const UserId = ({ userId }) => {
  return (
    <>
      <Stack
        direction="column"
        spacing={1}
        sx={{
          display: "flex",
          padding: "10px 12px",
          justifyContent: "space-between",
          alignItems: "flex-start",
          alignSelf: "stretch",
          borderRadius: "6px",
          border: "1px solid rgba(255, 255, 255, 0.30)",
          background: "rgba(255, 255, 255, 0.30)",
          transition: "transform 0.15s ease, background 0.15s ease",
          cursor: "pointer",
          // "&:hover": {
          //   transform: "scale(1.04)",
          //   background: "rgba(255, 255, 255, 0.45)",
          // },
        }}
        onClick={() => {
          navigator.clipboard.writeText(userId);
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            display: "flex",

            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "stretch",
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontSize: "1rem", fontWeight: "400" }}
          >
            User ID
          </Typography>
          <CopyAll sx={{ fontSize: "16px" }} />
        </Stack>
        <Divider sx={{ margin: "10px 0", width: "100%" }} />
        <Typography
          variant="body1"
          sx={{ fontSize: "1rem", fontWeight: "400" }}
        >
          {userId}
        </Typography>
      </Stack>
    </>
  );
};

const ExtraLinks = () => {
  const links = {
    "Terms of Service": "https://gleem.ai/terms-of-service",
    "Privacy Policy": "https://gleem.ai/terms-of-service#privacy-policy",
  };
  return (
    <Stack
      direction="column"
      spacing={1.5}
      display="flex"
      justifyContent="center"
      alignItems="flex-end"
      padding="10px 12px"
      sx={{ cursor: "pointer" }}
    >
      {Object.keys(links).map((key) => (
        <a
          href={links[key]}
          target="_blank"
          rel="noopener noreferrer"
          key={key}
          style={{ textDecoration: "none" }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Typography
              variant="body1"
              sx={{ fontSize: "0.9rem", fontWeight: "500", color: "#3D4755" }}
            >
              {key}
            </Typography>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M11 6V11.75C11 11.9142 10.9677 12.0767 10.9048 12.2284C10.842 12.38 10.75 12.5178 10.6339 12.6339C10.5178 12.75 10.38 12.842 10.2284 12.9048C10.0767 12.9677 9.91415 13 9.75 13H2.25C1.91848 13 1.60054 12.8683 1.36612 12.6339C1.1317 12.3995 1 12.0815 1 11.75V4.25C1 3.91848 1.1317 3.60054 1.36612 3.36612C1.60054 3.1317 1.91848 3 2.25 3H7.48375M9.5 1H13V4.5M6 8L12.75 1.25"
                stroke="#3D4755"
                stroke-opacity="0.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Stack>
        </a>
      ))}
    </Stack>
  );
};

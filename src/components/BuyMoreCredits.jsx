import React, { useState } from "react";
import SmallDialog from "./SmallDialog";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Stack,
  Tooltip,
} from "@mui/material";
import { useSelector } from "react-redux";

import photocolor from "../assets/photo_color.png";
import Paywall from "scenes/paywall";
import ShinyText from "./ShinyText";

const BuyMoreCredits = ({ location }) => {
  const theme = useTheme();
  const { balance, email, authenticated } = useSelector(
    (state) => state.authentication.user
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isClose, setIsClose] = useState(false);

  const handleOpenBuyDialog = () => {
    setIsOpen(true);
  };

  return (
    <>
      <SmallDialog
        title={""}
        open={isOpen}
        setOpen={setIsOpen}
        setClose={setIsClose}
        setData={() => {}}
        maxwidth="md"
        height="66vh"
      >
        <Paywall closeDialog={setIsOpen} location={location.pathname} />
      </SmallDialog>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          height: "38px",
          pl: "14px",
          pr: "6px",
          py: 0.5,
          bgcolor: "rgba(255, 255, 255, 0.35)",
          borderRadius: "52px",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          gap: "20px",
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              letterSpacing: "-0.28px",
            }}
          >
            <Box component="span" fontWeight={800} color="black">
              <ShinyText text={balance} speed={3} />
            </Box>
            <Box
              component="span"
              fontWeight={600}
              color="rgba(0, 0, 0, 0.5)"
              ml={0.5}
              sx={{ fontFamily: "Inter, sans-serif" }}
            >
              credits
            </Box>
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="small"
          onClick={handleOpenBuyDialog}
          sx={{
            textTransform: "none",
            borderRadius: "46px",
            background:
              "linear-gradient(88deg, rgba(4, 39, 197, 0.9) 0%, rgba(191, 5, 207, 0.81) 92%)",
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: "12px",
            py: 0.5,
            px: 1.5,

            "&:hover": {
              transform: "scale(1.01)",
              transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
              background:
                "linear-gradient(88deg, rgba(4, 39, 197, 1) 0%, rgba(191, 5, 207, 0.9) 92%)",
            },
          }}
        >
          BUY CREDITS
        </Button>
      </Stack>
    </>
  );
};

export default BuyMoreCredits;

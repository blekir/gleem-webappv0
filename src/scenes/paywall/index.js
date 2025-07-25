import { useTheme } from "@emotion/react";
import {
  ArrowForward,
  ArrowForwardIos,
  Check,
  CheckBox,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Slider,
  Stack,
  Switch,
  Tab,
  Typography,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import { useGetStripeProductsQuery } from "api/apiSlice";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import stars from "../../assets/icons/stars.svg";
import forward from "../../assets/icons/forward.svg";
import CountUp from "components/CountUp";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Paywall = (props) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { data, error, isLoading } = useGetStripeProductsQuery();

  const [currentTab, setcurrentTab] = useState(0);
  const [credits, setcredits] = useState([]);
  const [creditsSelectedValue, setcreditsSelectedValue] = useState(3);

  const [loading, setloading] = useState(true);

  const parseAndSetCredits = React.useCallback(() => {
    if (data) {
      const parsedCredits = [...data.data]
        .sort((a, b) => a.unit_amount - b.unit_amount)
        .filter((product) => product.recurring === null && product.active)
        .map((product, index) => {
          console.log(product);
          return {
            price_id: product.price_id,
            price: product.unit_amount / 100,
            credits: Number(product.metadata.credits),
          };
        });
      setcredits(parsedCredits);
    }
  }, [data]);

  useEffect(() => {
    parseAndSetCredits();
  }, [parseAndSetCredits]);

  useEffect(() => {
    credits && setloading(false);
  }, [credits]);

  if (loading || !data || isLoading || credits.length === 0)
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <CircularProgress />
          <Typography>Loading products...</Typography>
        </Box>
      </>
    );
  if (error) return <div>Error: {error.toString()}</div>;

  const handleChangeTab = (event, newValue) => {
    setcurrentTab(newValue);
  };

  const handleSubscribe = (price_id, period) => {
    props?.closeDialog(false);
    navigate(
      `/checkout?product=${price_id}&type=subscription&origin=${props.location}&value=${period}`
    );
  };

  const handleBuyCredits = (price_id, value) => {
    navigate(
      `/checkout?product=${price_id}&type=payment&origin=${props.location}&value=${value}`
    );
  };

  const handleCreditsChange = (event, newValue) => {
    setcreditsSelectedValue(newValue);
  };

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "column" }}
        spacing={{ xs: 0.5, sm: 2, md: 2 }}
        useFlexGap
        sx={{
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "0px",
        }}
      >
        <motion.Box
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img src={stars} alt="stars" width="30px" />
          <Typography sx={{ fontSize: "1.3rem", fontWeight: "700" }}>
            Create stunning AI Avatars & Images
          </Typography>
        </motion.Box>
        <motion.Box
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            sx={{
              fontSize: "0.8rem",
              fontWeight: "400",
              width: "100%",
              textAlign: "center",
              color: theme.palette.text.secondary,
              marginBottom: "20px",
            }}
          >
            Transform your photos into personalized AI Avatars and generate
            amazing images with them.
          </Typography>
        </motion.Box>
        <motion.Box
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs
            disableRipple
            value={currentTab}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
            sx={{
              minHeight: 0,
              background: "rgba(229, 230, 234)",
              borderRadius: "30px",

              margin: "0px 0px",
              padding: "0px 0px",
              boxShadow: "0 2px 8px rgba(24, 144, 255, 0.08)",

              "& .MuiTab-root": {
                color: "rgba(61, 71, 85, 0.70)",

                borderRadius: "30px",
                minHeight: 0,
                maxHeight: 30,
                minWidth: 80,
                fontWeight: 700,
                fontSize: "0.7rem",
                margin: "5px 5px",
                transition:
                  "background 0.2s, color 0.2s, transform 0.3s cubic-bezier(0.4,0,0.2,1)",

                "&.Mui-selected": {
                  color: "rgba(61, 71, 85, 0.9)",
                  background: "rgba(255, 255, 255, 0.80)",
                  borderRadius: "30px",
                  boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.15)",
                  transform: "translateX(0)",
                  zIndex: 1,
                },
              },
            }}
            TabIndicatorProps={{ style: { display: "none" } }}
          >
            <Tab disableRipple label="SUBSCRIPTION" {...a11yProps(0)} />
            <Tab disableRipple label="CREDITS" {...a11yProps(1)} />
          </Tabs>
        </motion.Box>
        {/* SUBSCRIPTION */}
        <CustomTabPanel value={currentTab} index={0}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 0.5, sm: 2, md: 3 }}
            useFlexGap
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: "-20px",
            }}
          >
            {[...data.data]
              .sort((a, b) => a.unit_amount - b.unit_amount)
              .filter((product) => product.recurring !== null && product.active)
              .map((product, index) => {
                return (
                  <motion.Paper
                    key={index}
                    elevation={5}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0 }}
                    style={{
                      backgroundColor:
                        product.recurring.interval === "month"
                          ? "rgba(255, 255, 255, 0.80)"
                          : "rgba(255, 255, 255, 0.40)",
                      borderRadius: "16px",
                      boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      position="relative"
                      sx={{
                        padding: "20px 0px",
                        width: "230px",
                        height: "auto",
                      }}
                      gap="5px"
                    >
                      {product.recurring.interval === "month" && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: "-10px",
                            right: "-10px",
                            width: "72px",
                            height: "22px",
                            backgroundColor: "#CA0B4A",
                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            fontSize: "0.8rem",
                            fontWeight: "700",
                          }}
                        >
                          25% OFF
                        </Box>
                      )}
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="flex-start"
                        sx={{
                          padding: "0px 20px",
                          width: "100%",
                          height: "auto",
                        }}
                        gap="5px"
                      >
                        <Typography
                          sx={{
                            fontSize: "1.1rem",
                            fontWeight: "700",
                          }}
                        >{`${
                          product.recurring.interval === "month"
                            ? "Monthly"
                            : "Weekly"
                        } ${product.product_name}`}</Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          {product.recurring.interval === "month" && (
                            <>
                              <Typography
                                sx={{
                                  position: "relative",
                                  fontSize: "1.1rem",
                                  fontWeight: "400",
                                  color: "rgba(0, 0, 0, 0.70)",
                                }}
                              >
                                $32.99
                              </Typography>
                              <Box
                                sx={{
                                  position: "absolute",

                                  width: "58px",
                                  height: "1.5px",
                                  transform: "rotate(-14.364deg)",
                                  backgroundColor: "#E20909",
                                  borderRadius: "5px",
                                }}
                              ></Box>
                            </>
                          )}

                          <Typography
                            sx={{
                              fontSize: "1.1rem",
                              fontWeight: "700",
                              background:
                                "linear-gradient(89deg, #0427C5 -0.31%, rgba(191, 5, 207, 0.90) 95.16%)",
                              backgroundClip: "text",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            }}
                          >{`$${parseFloat(product.unit_amount / 100).toFixed(
                            2
                          )} / ${
                            product.recurring.interval === "month"
                              ? "month"
                              : "week"
                          }`}</Typography>
                        </Box>
                        <Divider
                          sx={{ width: "100%", margin: "5px 0px 20px 0px" }}
                        />
                        <Box
                          key={index}
                          display="flex"
                          flexDirection="row"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                          sx={{ width: "180px" }}
                          gap="15px"
                        >
                          {/* <Check
                                fontSize="small"
                                sx={{ color: theme.palette.yellows[700] }}
                              /> */}
                          <CheckMark />
                          <Typography
                            sx={{
                              fontSize: "0.8rem",
                              color: "rgb(0, 0, 0)",
                            }}
                          >
                            100 credits a day
                          </Typography>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: "0.7rem",
                            color: "rgba(0, 0, 0, 0.50)",
                            marginLeft: "35px",
                            marginTop: "-5px",
                          }}
                        >
                          $0.008 per credit
                        </Typography>
                        {Object.keys(product.metadata).map((feature, index) => {
                          return (
                            <Box
                              key={index}
                              display="flex"
                              flexDirection="row"
                              justifyContent="flex-start"
                              alignItems="flex-start"
                              sx={{ width: "180px" }}
                              gap="15px"
                            >
                              {/* <Check
                                fontSize="small"
                                sx={{ color: theme.palette.yellows[700] }}
                              /> */}
                              <CheckMark />
                              <Typography
                                sx={{
                                  fontSize: "0.8rem",
                                  color: "rgb(0, 0, 0)",
                                }}
                              >
                                {product.metadata[feature]}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                      <Button
                        variant="contained"
                        sx={{
                          alignSelf: "center",
                          width: "80%",
                          borderRadius: "6px",
                          fontWeight: "700",
                          fontSize: "0.8rem",
                          fontFamily: "Inter",
                          lineHeight: "18px",
                          padding: "9px 10px",
                          marginTop: "20px",
                          background:
                            "linear-gradient(89deg, rgba(4, 39, 197, 0.80) -0.31%, rgba(191, 5, 207, 0.72) 95.16%)",

                          "&:hover": {
                            backgroundColor: theme.palette.yellows[600],
                          },
                        }}
                        onClick={() =>
                          handleSubscribe(
                            product.price_id,
                            product.recurring.interval
                          )
                        }
                        endIcon={
                          <img src={forward} alt="arrowForward" width="15px" />
                        }
                      >
                        {`BUY ${
                          product.recurring.interval === "month"
                            ? "MONTHLY"
                            : "WEEKLY"
                        }`}
                      </Button>
                    </Box>
                  </motion.Paper>
                );
              })}
          </Stack>
          {/* <Footer /> */}
        </CustomTabPanel>

        {/* CREDITS */}
        <CustomTabPanel value={currentTab} index={1}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 0.5, sm: 2, md: 4 }}
            useFlexGap
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: "-20px",
            }}
          >
            {/* [...data.data] .sort((a, b) => a.unit_amount - b.unit_amount)
            .filter((product) => product.recurring === null && product.active)
            .map((product, index) => */}

            <motion.Paper
              elevation={5}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.80)",

                borderRadius: "16px",
                boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.15)",
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="flex-start"
                position="relative"
                sx={{
                  padding: "20px 0px",
                  width: "230px",
                  height: "330px",
                }}
                gap="5px"
              >
                {credits.length > 0 &&
                  credits[creditsSelectedValue - 1].credits === 90 && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "-10px",
                        right: "-10px",
                        width: "72px",
                        height: "22px",
                        backgroundColor: "#CA0B4A",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        fontSize: "0.8rem",
                        fontWeight: "700",
                        boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      POPULAR
                    </Box>
                  )}
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  sx={{
                    padding: "0px 20px",
                    width: "100%",
                    height: "auto",
                  }}
                  gap="5px"
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    {/* PROMO  */}
                    {/* {product.recurring.interval === "month" && (
                      <>
                        <Typography
                          sx={{
                            position: "relative",
                            fontSize: "1.1rem",
                            fontWeight: "400",
                            color: "rgba(0, 0, 0, 0.70)",
                          }}
                        >
                          $32.99
                        </Typography>
                        <Box
                          sx={{
                            position: "absolute",

                            width: "58px",
                            height: "1.5px",
                            transform: "rotate(-14.364deg)",
                            backgroundColor: "#E20909",
                            borderRadius: "5px",
                          }}
                        ></Box>
                      </>
                    )} */}

                    {credits.length > 0 && (
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                        marginLeft="4px"
                        gap="4px"
                      >
                        <Box
                          width="6px"
                          height="6px"
                          borderRadius="30% 0% 0% 30%"
                          backgroundColor="rgba(191, 5, 207, 0.60)"
                          sx={{
                            marginTop: "30px",
                            marginLeft: "-10px",
                            marginRight: "-4px",
                            zIndex: 0,
                          }}
                        />
                        <Slider
                          sx={{
                            width: "190px",
                            margin: "0px 0px",

                            marginTop: "30px",

                            // Style the track and rail for better effect

                            "& .MuiSlider-rail": {
                              height: "6px",
                              opacity: 1,
                              background:
                                "linear-gradient(90deg, rgba(191, 5, 207, 0.60) 0%, #007AFF 100%)",
                            },
                            // Optionally, style the thumb for better appearance
                            "& .MuiSlider-thumb": {
                              borderRadius: "30px",
                              background: "#1485FF",
                              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.30)",
                              width: "10.95px",
                              height: "26px",
                              flexShrink: 0,
                              "&:hover": {},
                            },
                            "& .MuiSlider-mark": {
                              background: "white",
                              width: "3px",
                              height: "8px",
                            },
                            " & .MuiSlider-markLabel": {
                              fontSize: "0.8rem",
                              marginTop: "-50px",
                            },
                            "& .MuiSlider-markLabelActive": {
                              fontWeight: "700",
                            },
                          }}
                          value={creditsSelectedValue}
                          onChange={handleCreditsChange}
                          min={1}
                          max={5}
                          step={1}
                          marks={credits.map((credit, index) => ({
                            value: index + 1,
                            label: credit.credits,
                          }))}
                          track={false}
                        />
                        <Box
                          width="6px"
                          height="6px"
                          borderRadius="0% 30% 30% 0%"
                          backgroundColor="#007AFF"
                          sx={{
                            marginTop: "30px",
                            marginLeft: "-3px",
                            zIndex: 0,
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                  {/* <Typography
                    sx={{
                      fontSize: "1.2rem",
                      color: "rgba(0, 0, 0)",
                      fontWeight: "700",
                    }}
                  >
                    {`${credits[creditsSelectedValue - 1].credits} credits`}
                  </Typography> */}
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    gap="5px"
                  >
                    <CountUp
                      from={credits[creditsSelectedValue - 1].credits}
                      to={credits[creditsSelectedValue - 1].credits}
                      duration={0.1}
                      style={{
                        fontSize: "1.2rem",
                        color: "rgba(0, 0, 0)",
                        fontWeight: "700",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "1.2rem",
                        color: "rgba(0, 0, 0)",
                        fontWeight: "700",
                      }}
                    >
                      credits
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: "700",
                      background:
                        "linear-gradient(89deg, #0427C5 -0.31%, rgba(191, 5, 207, 0.90) 95.16%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >{`$${credits[creditsSelectedValue - 1].price}`}</Typography>

                  <Divider sx={{ width: "100%", margin: "5px 0px 20px 0px" }} />
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    gap="5px"
                  >
                    <CheckMark />
                    <Typography>Watermark removed</Typography>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    gap="5px"
                  >
                    <CheckMark />
                    <Typography>Commercial use</Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    alignSelf: "center",
                    width: "80%",
                    borderRadius: "6px",
                    fontWeight: "700",
                    fontSize: "0.8rem",
                    fontFamily: "Inter",
                    lineHeight: "18px",
                    padding: "9px 10px",
                    background:
                      "linear-gradient(89deg, rgba(4, 39, 197, 0.80) -0.31%, rgba(191, 5, 207, 0.72) 95.16%)",

                    "&:hover": {
                      backgroundColor: theme.palette.yellows[600],
                    },
                  }}
                  onClick={() =>
                    handleBuyCredits(
                      credits[creditsSelectedValue - 1].price_id,
                      credits[creditsSelectedValue - 1].credits
                    )
                  }
                  endIcon={
                    <img src={forward} alt="arrowForward" width="15px" />
                  }
                >
                  {`BUY ${credits[creditsSelectedValue - 1].credits} credits`}
                </Button>
              </Box>
            </motion.Paper>
          </Stack>
        </CustomTabPanel>
        <Footer />
      </Stack>
    </>
  );
};

export default Paywall;

const CheckMark = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
    >
      <path
        d="M4.5 9L7.9191 12.932C8.37219 13.453 9.2045 13.369 9.54426 12.7678L14.5 4"
        stroke="#2FBD81"
        stroke-width="2.5"
        stroke-linecap="round"
      />
      <path
        d="M4.5 9L7.9191 12.932C8.37219 13.453 9.2045 13.369 9.54426 12.7678L14.5 4"
        stroke="url(#paint0_linear_25_83)"
        stroke-width="2.5"
        stroke-linecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_25_83"
          x1="4.5"
          y1="16.6667"
          x2="15.0387"
          y2="16.5409"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#0427C5" />
          <stop offset="0.916586" stop-color="#BF05CF" stop-opacity="0.9" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const Footer = () => {
  return (
    <motion.Box
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        justifySelf: "flex-end",
        gap: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "7px",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="10"
          viewBox="0 0 11 10"
          fill="none"
        >
          <circle cx="5.5" cy="5" r="5" fill="#2FBD81" />
        </svg>
        <Typography>Join thousands creating AI content</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "7px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="10"
            viewBox="0 0 11 10"
            fill="none"
          >
            <circle cx="5.5" cy="5" r="5" fill="#2FBD81" />
          </svg>
          <Typography>Professional Quality</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "7px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="10"
            viewBox="0 0 11 10"
            fill="none"
          >
            <circle cx="5.5" cy="5" r="5" fill="#2FBD81" />
          </svg>
          <Typography>Secure & Private</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "7px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="10"
            viewBox="0 0 11 10"
            fill="none"
          >
            <circle cx="5.5" cy="5" r="5" fill="#2FBD81" />
          </svg>
          <Typography>Fast & Easy</Typography>
        </Box>
      </Box>
    </motion.Box>
  );
};

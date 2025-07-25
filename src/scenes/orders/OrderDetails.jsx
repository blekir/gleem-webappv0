import { Check, CheckBox } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Slide,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  useDeleteImagesMutation,
  useGetOrderDetailsQuery,
  useUpscalePrintMutation,
} from "api/apiSlice";
import ConfirmActionDialog from "components/ConfirmActionDialog";
import ImageDialog, { ImageDialogButtons } from "components/ImageDialog";
import LazyImageWithSkeleton from "components/LazyImageWithSkeleton";
import SelectionMark from "components/SelectionMark";

import SmallDialog from "components/SmallDialog";
import { useSnackbar } from "notistack";

import React, { Fragment, useState, useEffect } from "react";
import useZipDownload from "hooks/useZipDownload";

const Title = ({ data }) => {
  const theme = useTheme();
  return (
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
      <Typography sx={{ fontWeight: 600 }}>{data.product}</Typography>
      <Typography
        sx={{
          fontWeight: 800,
          paddingBottom: "10px",
          color: theme.palette.yellows[700],
        }}
      >
        {data.lora_type}
      </Typography>
    </Stack>
  );
};

const OrderDetails = ({ isOpen, setIsOpen, setIsClose, order }) => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const handleZipDownload = useZipDownload();
  const { data, error, isLoading } = useGetOrderDetailsQuery({
    _id: order.uuid,
  });

  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedImages, setselectedImages] = useState([]);
  const [orderData, setorderData] = useState(null);

  const [success, setsuccess] = useState(false);

  const [confirmDialogProp, setconfirmDialogProp] = useState({
    open: false,
    title: "",
    content: "",
    onConfirm: () => {},
  });

  const [submit] = useUpscalePrintMutation();
  const [deleteImages] = useDeleteImagesMutation();
  useEffect(() => {
    if (data) {
      setorderData(data.data);
    }
  }, [data]);

  if (isLoading || !orderData)
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

  const handleOpenImageDialog = (index) => {
    setCurrentImage(index);
    setImageDialogOpen(true);
  };

  const handleSelectImages = (index) => {
    setselectedImages((current) => {
      if (current.includes(index)) {
        // Deselect if already selected
        return current.filter((item) => item !== index);
      } else {
        return [...current, index];
      }
    });
  };

  const handleSubmit = async () => {
    const urls = data.data.images.filter((img, index) =>
      selectedImages.includes(index)
    );

    const res = await submit({ orderId: order.uuid, urls: urls }).unwrap();
    enqueueSnackbar("Order placed!", {
      variant: "success",
    });
  };

  const handleDeleteImages = async () => {
    try {
      const res = await deleteImages({
        images: selectedImages.map((index) => orderData.images[index]),
      }).unwrap();
      enqueueSnackbar("Images deleted!", {
        variant: "success",
      });

      setorderData({
        ...orderData,
        images: orderData.images.filter(
          (img, index) => !selectedImages.includes(index)
        ),
      });
      setselectedImages([]);
    } catch (error) {
      enqueueSnackbar("Error deleting images", { variant: "error" });
    }
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    const urls = data.data.images.filter((img, index) =>
      selectedImages.includes(index)
    );
    handleZipDownload(urls, orderData.product);
  };

  return (
    <Fragment>
      <ConfirmActionDialog
        title={confirmDialogProp.title}
        content={confirmDialogProp.content}
        open={confirmDialogProp.open}
        setOpen={(open) => setconfirmDialogProp({ ...confirmDialogProp, open })}
        onConfirm={confirmDialogProp.onConfirm}
      />
      <SmallDialog
        title={<Title data={orderData} />}
        open={isOpen}
        setOpen={setIsOpen}
        setClose={setIsClose}
        setData={() => {}}
      >
        <>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 0.5, sm: 1, md: 1 }}
            useFlexGap
            position="relative"
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {orderData.images.map((img, index) => (
              <>
                <Box
                  onClick={() => handleOpenImageDialog(index)}
                  sx={{
                    position: "relative",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.03)",
                      cursor: "pointer",
                    },
                  }}
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                  }}
                >
                  <LazyImageWithSkeleton
                    src={img}
                    alt={"order_image"}
                    width="200px"
                  />
                  {hoveredIndex === index && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 6,
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        // bgcolor: theme.palette.yellows[700],
                        border: `2px solid ${theme.palette.yellows[700]}`,
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectImages(index);
                      }}
                    >
                      {selectedImages.includes(index) && <Check />}
                    </Box>
                  )}
                  {selectedImages.includes(index) && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 6,
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        bgcolor: theme.palette.yellows[700],

                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectImages(index);
                      }}
                    >
                      {selectedImages.includes(index) && <Check />}
                    </Box>
                  )}
                </Box>
              </>
            ))}
          </Stack>
          {selectedImages.length > 0 && (
            <Paper
              elevation={10}
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                marginTop: "20px",
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(5,107,240,0.7)",

                padding: "10px",
                borderRadius: "20px 20px 0px 0px",
                width: "33%",
                height: "90px",
                backdropFilter: "blur(5px)",
              }}
            >
              <ImageDialogButtons
                onUpscale={() => {}}
                onShare={() => {}}
                onDownload={(e) => {
                  handleDownload(e);
                }}
                onDelete={() => {
                  setconfirmDialogProp({
                    open: true,
                    title: `Delete ${
                      selectedImages.length > 1 ? "Images" : "Image"
                    }`,
                    content: `Are you sure you want to delete selected ${
                      selectedImages.length > 1 ? "images" : "image"
                    }?`,
                    onConfirm: () => {
                      handleDeleteImages();
                    },
                  });
                }}
                color="white"
              />
            </Paper>
          )}
        </>
      </SmallDialog>

      <ImageDialog
        images={orderData.images}
        open={imageDialogOpen}
        setOpen={setImageDialogOpen}
        index={currentImage}
        title={<Title data={orderData} />}
      />
    </Fragment>
  );
};

export default OrderDetails;

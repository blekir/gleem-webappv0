import { Fragment, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Box,
  CircularProgress,
  IconButton,
  ImageList,
  ImageListItem,
  LinearProgress,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  useGetOrdersQuery,
  useDeleteOrderMutation,
  useLazyGetOrderDetailsQuery,
} from "api/apiSlice";
import LazyImageWithSkeleton from "components/LazyImageWithSkeleton";

import OrderDetails from "./OrderDetails";
import { useSSE } from "contexts/SSEContext";
import { Delete } from "@mui/icons-material";
import { ImageDialogButtons } from "components/ImageDialog";
import ConfirmActionDialog from "components/ConfirmActionDialog";
import { enqueueSnackbar } from "notistack";
import JSZip from "jszip";
import useZipDownload from "hooks/useZipDownload";
import useContainerWidth from "hooks/useContainerWidth";

const Orders = () => {
  const { data, error, isLoading, refetch } = useGetOrdersQuery({
    refetchOnMountOrArgChange: true,
  });

  const [ref, width] = useContainerWidth();
  // Example: 1 column per 300px of width
  const columns = Math.max(1, Math.floor(width / 320));

  const theme = useTheme();
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [deleteOrder] = useDeleteOrderMutation();
  const [
    getOrderDetails,
    {
      data: orderDetails,
      error: orderDetailsError,
      isLoading: orderDetailsLoading,
    },
  ] = useLazyGetOrderDetailsQuery();

  const { orderProgressMap } = useSSE();
  const handleZipDownload = useZipDownload();

  const [orderDetailsOpen, setorderDetailsOpen] = useState(false);
  const [order, setorder] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [confirmDialogProp, setconfirmDialogProp] = useState({
    open: false,
    title: "",
    content: "",
    onConfirm: () => {},
  });
  const [orders, setOrders] = useState([]);
  // const [ordersProgress, setOrdersProgress] = useState({});

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (orderId && data?.data) {
      const foundOrder = data.data.find((o) => o.uuid === orderId);
      if (foundOrder) {
        console.log(foundOrder);
        setorder(foundOrder);
        setorderDetailsOpen(true);
      }
    }
  }, [orderId, data]);

  useEffect(() => {
    if (data?.data) {
      setOrders(data.data);
    }
  }, [data]);

  // useEffect(() => {
  //   if (!orderDetailsOpen) {
  //     setorder(null);
  //     navigate("/orders");
  //   }
  // }, [orderDetailsOpen]);

  if (isLoading || !orders)
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
          <Typography>Loading orders...</Typography>
        </Box>
      </>
    );
  if (error) return <div>Error: {error.toString()}</div>;

  const handleOpenDialog = (ord, progress) => {
    if (progress !== 100) return false;

    setorderDetailsOpen(true);
    setorder(ord);
    navigate(`/orders/${ord.uuid}`);
  };
  const handleCloseDialog = () => {
    setorderDetailsOpen(false);
    setorder(-1);
    navigate("/orders"); // remove the orderId from the URL
  };

  const handleDeleteOrder = (e, uuid) => {
    e.stopPropagation();
    console.log(uuid);
    setconfirmDialogProp({
      open: true,
      title: "Delete Order",
      content: "Are you sure you want to delete this order?",
      onConfirm: () => {
        try {
          deleteOrder({ _id: uuid });
          enqueueSnackbar("Order deleted successfully", {
            variant: "success",
          });
          setOrders(orders.filter((order) => order.uuid !== uuid));
        } catch (error) {
          console.log(error);
          enqueueSnackbar("Failed to delete order", {
            variant: "error",
          });
        }
      },
    });
  };

  const handleDownloadOrder = async (e, uuid) => {
    e.stopPropagation();
    try {
      const response = await getOrderDetails({ _id: uuid }).unwrap();
      handleZipDownload(response.data.images, response.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  //   const zip = new JSZip();

  //   try {
  //     // Fetch all images, add to zip
  //     await Promise.all(
  //       images.map(async (url, index) => {
  //         const response = await fetch(url, { credentials: "include" });
  //         if (!response.ok) throw new Error(`Failed to fetch ${url}`);
  //         const blob = await response.blob();
  //         zip.file(`${product}_${index}.png`, blob);
  //       })
  //     );

  //     // Generate the zip file as Blob
  //     const content = await zip.generateAsync({ type: "blob" });

  //     // Create a download link and trigger it
  //     const link = document.createElement("a");
  //     link.href = URL.createObjectURL(content);
  //     link.download = `gleem_${product}.zip`;
  //     document.body.appendChild(link);
  //     link.click();

  //     // Cleanup link element
  //     link.remove();
  //     URL.revokeObjectURL(link.href);
  //     enqueueSnackbar("Images downloaded successfully", {
  //       variant: "success",
  //     });
  //   } catch (error) {
  //     console.error("Error generating zip:", error);
  //     enqueueSnackbar("There was an error downloading the images.", {
  //       variant: "error",
  //     });
  //   }
  // };

  return (
    <Box
      ref={ref}
      sx={{
        width: "100%",
        minWidth: 0,
        maxWidth: "100vw",
        boxSizing: "border-box",
      }}
    >
      <ConfirmActionDialog
        title={confirmDialogProp.title}
        content={confirmDialogProp.content}
        open={confirmDialogProp.open}
        setOpen={(open) => setconfirmDialogProp({ ...confirmDialogProp, open })}
        onConfirm={confirmDialogProp.onConfirm}
      />
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
        {/* <ImageList
        variant="masonry"
        cols={columns}
        gap={8}
        sx={{
          padding: "30px",
        }}
      > */}
        {orders.map((ord, index) => {
          const progress = orderProgressMap[ord.uuid] ?? {
              overall_progress: ord.progress,
              training_finished: false,
              training_progress: 0,
            } ?? {
              overall_progress: 0,
              training_finished: false,
              training_progress: 0,
            };
          return (
            <>
              <ImageListItem
                key={index}
                sx={{
                  width: "auto",
                  height: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0px",
                }}
              >
                <Box
                  key={index}
                  sx={{
                    transition: "transform 0.2s",
                    position: "relative",

                    "&:hover": {
                      transform: "scale(1.03)",
                      cursor:
                        progress.overall_progress !== 100 ? "wait" : "pointer",
                    },
                  }}
                  onClick={() =>
                    handleOpenDialog(ord, progress.overall_progress)
                  }
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <OrderTile
                      img={ord.thumb}
                      status={ord.status}
                      orderProgress={progress}
                      refetch={refetch}
                    />
                    {progress.overall_progress === 100 &&
                      hoveredIndex === index && (
                        <Paper
                          elevation={10}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            marginTop: "20px",
                            marginBottom: "0px",
                            position: "absolute",
                            bottom: 0,
                            left: "50%",
                            transform: "translateX(-50%)",
                            backgroundColor: "rgba(35, 106, 240, 0.7)",
                            padding: "10px",
                            borderRadius: "0px 0px 15px 15px",
                            width: "100%",
                            height: "55px",
                            backdropFilter: "blur(2px)",
                            boxShadow: "0px 0px 30px 0px rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          <ImageDialogButtons
                            onUpscale={(e) => {
                              e.stopPropagation();
                            }}
                            onShare={(e) => {
                              e.stopPropagation();
                            }}
                            onDownload={(e) => {
                              console.log("downloading order", ord.uuid);
                              handleDownloadOrder(e, ord.uuid);
                            }}
                            onDelete={(e) => {
                              handleDeleteOrder(e, ord.uuid);
                            }}
                            size="small"
                            color="white"
                          />
                        </Paper>
                      )}
                  </Box>
                </Box>
              </ImageListItem>
            </>
          );
        })}
      </Stack>
      {/* </ImageList> */}

      {order !== -1 && (
        <OrderDetails
          isOpen={orderDetailsOpen}
          setIsOpen={setorderDetailsOpen}
          setIsClose={handleCloseDialog}
          order={order}
        />
      )}
    </Box>
  );
};

export default Orders;

const OrderTile = ({ img, status, orderProgress, refetch }) => {
  const theme = useTheme();

  const [imgVersion, setImgVersion] = useState(0);
  const prevProgress = useRef(orderProgress.overall_progress);

  useEffect(() => {
    // Detect transition from <100 to >=100
    if (prevProgress.current < 100 && orderProgress.overall_progress >= 100) {
      setImgVersion((v) => v + 1);
      refetch();
    }
    prevProgress.current = orderProgress.overall_progress;
  }, [orderProgress]);

  // Append version as a cache-busting query param
  const imgSrc = imgVersion > 0 ? `${img}?v=${imgVersion}` : img;

  return (
    <Fragment>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <LazyImageWithSkeleton
          src={imgSrc}
          alt="thumb"
          width="300px"
          height="300px"
          style={{ borderRadius: "15px", display: "block" }}
        />
        {/* Progress bar overlay */}
        {status === 0 && orderProgress.overall_progress < 100 && (
          <Box
            sx={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              height: "50px",
              bgcolor: "rgba(5, 107, 240, 0.7)",
              // optional: semi-transparent background
              px: 1,
              py: 0.2,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {orderProgress.overall_progress === 0 ? (
              <Typography sx={{ color: "#fff", fontSize: "12px" }}>
                preparing data
              </Typography>
            ) : !orderProgress.training_finished ? (
              <Typography sx={{ color: "#fff", fontSize: "12px" }}>
                training avatar
              </Typography>
            ) : (
              <Typography sx={{ color: "#fff", fontSize: "12px" }}>
                generating images
              </Typography>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "80%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <LinearProgress
                  variant="determinate"
                  value={Number(orderProgress.overall_progress)}
                  sx={{
                    marginBottom: "5px",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#c730d5",
                    },
                  }}
                />
              </Box>
            </Box>
            <Typography
              variant="body2"
              sx={{ fontSize: "13px", color: "#fff" }}
            >
              {`${Math.round(orderProgress.overall_progress)}%`}
            </Typography>
          </Box>
        )}
      </Box>
    </Fragment>
  );
};

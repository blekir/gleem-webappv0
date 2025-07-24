import React, { useEffect, useState } from "react";
import { useRedeemPromoCodeMutation } from "api/apiSlice";
import { enqueueSnackbar } from "notistack";
import useGetUserData from "hooks/useGetUserData";

const useRedeemCode = () => {
  const [redeemPromoCode, { isError, error, isSuccess, data }] =
    useRedeemPromoCodeMutation();

  const { fetchUserData } = useGetUserData();

  const [response, setresponse] = useState(null);

  const handleRedeemPromoCode = async (promoCode) => {
    const response = await redeemPromoCode({
      code: promoCode,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setresponse(data);
      enqueueSnackbar(data.msg, { variant: "success" });
      fetchUserData();
    }
    if (isError) {
      setresponse(error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  }, [isSuccess, isError]);

  return { handleRedeemPromoCode };
};

export default useRedeemCode;

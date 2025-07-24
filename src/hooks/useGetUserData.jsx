import { useGetUserMutation } from "api/apiSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUserData } from "state/auth";

const useGetUserData = () => {
  const [getUser] = useGetUserMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const user = await getUser().unwrap();
      dispatch(updateUserData(user.data));
    } catch {}
  };

  return { fetchUserData };
};

export default useGetUserData;

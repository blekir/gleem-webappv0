import { useGetUserMutation } from "api/apiSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "state/auth";

const useGetUserData = () => {
  const [getUser] = useGetUserMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      console.log("fetching user data");
      const user = await getUser().unwrap();
      if (user.data) {
        console.log("setting credentials");
        // dispatch(updateUserData(user.data));
        dispatch(
          setCredentials({
            ...user.data,
            authenticated: true,
          })
        );
      }
    } catch {}
  };

  return { fetchUserData };
};

export default useGetUserData;

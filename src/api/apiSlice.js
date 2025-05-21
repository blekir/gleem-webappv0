import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { userEndpoints } from "./user";
import { authEndpoints } from "./auth";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://devrest.garagefarm.net",
  credentials: "include",
});

const query = async (args, api, extraOptions) => {
  const result = baseQuery(args, api, extraOptions);
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: query,
  endpoints: (builder) => ({
    ...authEndpoints(builder),
    ...userEndpoints(builder),
  }),
});

export const {
  useLoginMutation,
  useGetUsersMutation,
  useAddCreditsMutation,
  useActivateMutation,
  useMakeAdminMutation,
  useVersionMutation,
  useGetSubscribersMutation,
} = apiSlice;

import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { userEndpoints } from "./user";
import { productsEndpoints } from "./products";
import { generateEndpoints } from "./generate";
import { paymentsEndpoints } from "./payments";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://rest-as.garagefarm.net",
  credentials: "include",
});

const query = async (args, api, extraOptions) => {
  const result = baseQuery(args, api, extraOptions);
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: query,
  keepUnusedDataFor: 600,
  endpoints: (builder) => ({
    ...userEndpoints(builder),
    ...productsEndpoints(builder),
    ...generateEndpoints(builder),
    ...paymentsEndpoints(builder),
  }),
});

export const {
  useGetUsersMutation,
  useAddCreditsMutation,
  useActivateMutation,
  useMakeAdminMutation,
  useVersionMutation,
  useGetSubscribersMutation,
} = apiSlice;

// USER
export const { useLoginMutation, useGoogleLoginMutation, useLogoutMutation } =
  apiSlice;
export const { useGetLorasQuery } = apiSlice;
export const { useGetOrdersQuery } = apiSlice;
export const { useGetOrderDetailsQuery } = apiSlice;
export const { useLazyGetOrderDetailsQuery } = apiSlice;
export const { useRegisterMutation } = apiSlice;
export const { useGetUserMutation } = apiSlice;
export const { useRedeemPromoCodeMutation } = apiSlice;
export const { useDeleteOrderMutation } = apiSlice;
export const { useDeleteImagesMutation } = apiSlice;

// PRODUCTS
export const { useGetProductsQuery, useGetPromptCountQuery } = apiSlice;

// GENERATE
export const {
  useGenerateProductMutation,
  useBundleProductMutation,
  useUpscalePrintMutation,
} = apiSlice;

// PAYMENTS
export const { useCreateCheckoutSessionMutation } = apiSlice;
export const { useGetStripeProductsQuery } = apiSlice;

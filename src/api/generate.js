export const generateEndpoints = (builder) => {
  return {
    generateProduct: builder.mutation({
      query: (data) => ({
        url: "/generate",
        method: "post",
        credentials: "include",
        body: { ...data },
      }),
    }),
    bundleProduct: builder.mutation({
      query: (data) => ({
        url: "/bundle",
        method: "post",
        credentials: "include",
        body: data,
      }),
    }),
    upscalePrint: builder.mutation({
      query: (data) => ({
        url: `/upscale/${data.orderId}/print`,
        method: "post",
        credentials: "include",
        body: data,
      }),
    }),
  };
};

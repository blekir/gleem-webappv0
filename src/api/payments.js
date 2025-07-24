export const paymentsEndpoints = (builder) => {
  return {
    getStripeProducts: builder.query({
      query: () => ({
        url: "/user/get-products",
        method: "get",
        credentials: "include",
      }),
    }),
    createCheckoutSession: builder.mutation({
      query: (data) => ({
        url: "/user/create-checkout-session",
        method: "post",
        credentials: "include",
        body: data,
      }),
    }),
  };
};

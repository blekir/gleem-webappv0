export const userEndpoints = (builder) => {
  return {
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "post",
        credentials: "include",
        body: { ...credentials },
      }),
    }),

    getUser: builder.mutation({
      query: (credentials) => ({
        url: "/user/",
        method: "get",
        credentials: "include",
      }),
    }),

    register: builder.mutation({
      query: (credentials) => ({
        url: "/user/register",
        method: "post",
        credentials: "include",
        body: { ...credentials },
      }),
    }),
    version: builder.mutation({
      query: (credentials) => ({
        url: "/version",
        method: "get",
      }),
    }),
    getLoras: builder.query({
      query: () => ({
        url: `/user/avatars`,
        method: "get",
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: `/user/orders`,
        method: "get",
        credentials: "include",
      }),
    }),
    deleteOrder: builder.mutation({
      query: ({ _id }) => ({
        url: `/user/orders/${_id}`,
        method: "delete",
        credentials: "include",
      }),
    }),
    getOrderDetails: builder.query({
      query: ({ _id }) => ({
        url: `/user/orders/${_id}`,
        method: "get",
        credentials: "include",
      }),
    }),

    createCheckoutSession: builder.mutation({
      query: () => ({
        url: "/user/create-checkout-session",
        method: "post",
        credentials: "include",
      }),
    }),
    redeemPromoCode: builder.mutation({
      query: ({ code }) => ({
        url: "/user/redeem-code",
        method: "post",
        credentials: "include",
        body: { code },
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.msg,
      }),
    }),
    deleteImages: builder.mutation({
      query: ({ images }) => ({
        url: `/images`,
        method: "delete",
        credentials: "include",
        body: { images },
      }),
    }),
  };
};

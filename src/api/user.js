export const userEndpoints = (builder) => {
  return {
    getUsers: builder.mutation({
      query: () => ({
        url: '/users',
        method: 'get',
      }),
    }),
    getSubscribers: builder.mutation({
      query: () => ({
        url: '/subscribers',
        method: 'get',
      }),
    }),
    addCredits: builder.mutation({
      query: (data) => ({
        url: '/addCredits',
        method: 'post',
        body: { ...data },
      }),
    }),
    activate: builder.mutation({
      query: (data) => ({
        url: '/activateUser',
        method: 'post',
        body: { ...data },
      }),
    }),
    makeAdmin: builder.mutation({
      query: (data) => ({
        url: '/makeAdmin',
        method: 'post',
        body: { ...data },
      }),
    }),
  };
};

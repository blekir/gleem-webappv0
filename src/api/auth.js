export const authEndpoints = (builder) => {
  return {
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'post',
        body: { ...credentials },
      }),
    }),
    version: builder.mutation({
      query: (credentials) => ({
        url: '/version',
        method: 'get',
      }),
    }),
  };
};

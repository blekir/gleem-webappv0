export const productsEndpoints = (builder) => {
  return {
    getProducts: builder.query({
      query: (data) => ({
        url: `/v2/products?gender=${data.gender}&species=${data.species}`,
        method: "get",
        // credentials: "include",
      }),
    }),
    getPromptCount: builder.query({
      query: ({ productId, species, gender }) => ({
        url: `/products/${productId}/prompt_count?species=${species}&gender=${gender}`,
        method: "get",
        credentials: "include",
      }),
    }),
  };
};

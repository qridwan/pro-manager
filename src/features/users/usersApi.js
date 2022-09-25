import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `/users`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetUserQuery } = usersApi;

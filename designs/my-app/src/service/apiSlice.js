import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1/",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getToken: builder.mutation({
      query: (user) => ({
        url: "user/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    getProfile: builder.mutation({
      query: (token) => ({
        url: "user/profile",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["User"],
    }),
    editUser: builder.mutation({
      query: (user) => ({
        url: "user/profile",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: { userName: user.userName },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetTokenMutation,
  useGetProfileMutation,
  useEditUserMutation,
} = apiSlice;
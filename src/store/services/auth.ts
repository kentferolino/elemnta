import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AuthState } from "../types/auth";
import type { UserDetails } from "@/types/user";

const { VITE_API_AUTH_URL } = import.meta.env;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_API_AUTH_URL,
    prepareHeaders: (headers, { getState }) => {
      const authToken = (getState() as { auth: AuthState }).auth.authToken;
      if (authToken) {
        headers.set("authorization", `Bearer ${authToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<
      { authToken: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getUserDetails: builder.query<UserDetails, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useGetUserDetailsQuery } = authApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AuthState } from "../types/auth";
import type { Person } from "@/types/person";

const { VITE_API_PERSON_URL } = import.meta.env;

export const personApi = createApi({
  reducerPath: "personApi",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_API_PERSON_URL,
    prepareHeaders: (headers, { getState }) => {
      const authToken = (getState() as { auth: AuthState }).auth.authToken;
      if (authToken) {
        headers.set("authorization", `Bearer ${authToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPeople: builder.query<Person[], void>({
      query: () => "/person",
    }),
  }),
});

export const { useGetPeopleQuery } = personApi;

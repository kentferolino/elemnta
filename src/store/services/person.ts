import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AuthState } from "../types/auth";
import type { Person } from "@/types/person";

const { VITE_API_PERSON_URL } = import.meta.env;

interface CreatePersonRequest {
  first_name: string;
  last_name: string;
  preferred_name: string;
  date_of_birth: string;
  gender: string;
  marital_status: string;
  mobile_number: string;
  home_email: string;
  office_email: string;
  home_address: string;
  office_address: string;
  user_id: string;
}

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
  tagTypes: ["Person"],
  endpoints: (builder) => ({
    getPeople: builder.query<Person[], void>({
      query: () => "/person",
      providesTags: ["Person"],
    }),
    deletePerson: builder.mutation<void, string>({
      query: (personId) => ({
        url: `/person/${personId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Person"],
    }),
    deletePeople: builder.mutation<void, string[]>({
      query: (personIds) => ({
        url: "/person",
        method: "DELETE",
        body: { person_ids: personIds },
      }),
      invalidatesTags: ["Person"],
    }),
    createPerson: builder.mutation<Person, CreatePersonRequest>({
      query: (person) => ({
        url: "/person",
        method: "POST",
        body: person,
      }),
      invalidatesTags: ["Person"],
    }),
  }),
});

export const {
  useGetPeopleQuery,
  useDeletePersonMutation,
  useDeletePeopleMutation,
  useCreatePersonMutation,
} = personApi;

import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const { VITE_API_AUTH_URL } = import.meta.env;

interface AuthState {
  authToken: string | null;
  isAuthenticated: boolean;
}

const persistedToken = localStorage.getItem("authToken");

const initialState: AuthState = {
  authToken: persistedToken,
  isAuthenticated: !!persistedToken,
};

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
  }),
});

export const { useLoginMutation } = authApi;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload: { authToken } }) => {
      state.authToken = authToken;
      state.isAuthenticated = true;
      localStorage.setItem("authToken", authToken);
    },
    logout: (state) => {
      state.authToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("authToken");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

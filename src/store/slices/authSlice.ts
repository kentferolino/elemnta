import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../types/auth";

const persistedToken = localStorage.getItem("authToken");

const initialState: AuthState = {
  authToken: persistedToken,
  isAuthenticated: !!persistedToken,
};

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

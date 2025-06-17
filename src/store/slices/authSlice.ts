import { createSlice } from "@reduxjs/toolkit";
import type { UserDetails } from "@/types/user";
import type { AuthState } from "../types/auth";

const persistedToken = localStorage.getItem("authToken");

const initialState: AuthState = {
  authToken: persistedToken,
  isAuthenticated: !!persistedToken,
  user: null,
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
    setUser: (state, { payload }: { payload: UserDetails }) => {
      state.user = payload;
    },
    logout: (state) => {
      state.authToken = null;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("authToken");
    },
  },
});

export const { setCredentials, setUser, logout } = authSlice.actions;
export default authSlice.reducer;

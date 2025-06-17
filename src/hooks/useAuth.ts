import type { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { authApi } from "@/store/services/auth";

export const useAuth = () => {
  const { isAuthenticated, user, authToken } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(authApi.util.resetApiState());
  };

  return {
    isAuthenticated,
    user,
    authToken,
    handleLogout,
  };
};

import type { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";

export const useAuth = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    isAuthenticated,
    handleLogout,
  };
};

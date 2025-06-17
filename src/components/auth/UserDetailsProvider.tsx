import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetUserDetailsQuery } from "@/store/services/auth";
import { setUser } from "@/store/slices/authSlice";
import type { RootState } from "@/store";

type Props = {
  children: React.ReactNode;
  requireAuth?: boolean;
};

const UserDetailsProvider = ({ children }: Props) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    data: userDetails,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (userDetails && !user) {
      dispatch(setUser(userDetails));
    }
  }, [userDetails, user, dispatch]);

  useEffect(() => {
    if (isAuthenticated && !user && !isLoading) {
      refetch();
    }
  }, [isAuthenticated, user, isLoading, refetch]);

  if (isAuthenticated && isLoading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated && error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load user details</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default UserDetailsProvider;

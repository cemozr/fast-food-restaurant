import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./states/store";
import Loading from "./components/UI/Loading";
import { fetchUserRole } from "./states/authSlice";

type ProtectedRouteProps = {
  children: ReactNode;
  requiredRole?: string;
};

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { user, role, isLoading } = useSelector((state: RootState) => {
    return state.authReducer;
  });
  const dispatch: AppDispatch = useDispatch();
  if (isLoading || role === null) {
    dispatch(fetchUserRole(user?.uid!));
    if (role !== null && role === requiredRole) {
      return <>{children}</>;
    }
    return <Loading />;
  }
  if (!user) {
    console.log("kullanıcı yok");
    return <Navigate to="/auth" />;
  }
  if (role !== requiredRole) {
    console.log("Rolün bu sayfaya erişimi yok");
    return <Navigate to="/auth" />;
  }
  return <>{children}</>;
}

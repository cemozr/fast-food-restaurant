import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./states/store";
import Loading from "./components/UI/Loading";

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
  if (isLoading || role === null) {
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

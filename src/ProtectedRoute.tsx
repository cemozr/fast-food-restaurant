import { ReactNode } from "react";
import { auth } from "./config/firebase";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = auth.currentUser;

  return user ? children : <Navigate to="/auth" replace />;
}

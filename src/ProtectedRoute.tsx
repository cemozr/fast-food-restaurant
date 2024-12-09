import { ReactNode, useEffect } from "react";
import { auth, db } from "./config/firebase";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./states/store";
import { setisLoading, setRole, setUser } from "./states/authSlice";
import Loading from "./components/UI/Loading";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

type ProtectedRouteProps = {
  children: ReactNode;
  requiredRole?: string;
};

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const dispatch = useDispatch();

  const { user, isLoading, role } = useSelector((state: RootState) => {
    console.log("Role from Redux store:", state.authReducer.role);
    return state.authReducer;
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      // dispatch(setisLoading(true));
      if (currentUser) {
        if (!user) {
          dispatch(
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
            }),
          );
        }
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            dispatch(setRole(userDoc.data().role));
          } else {
            dispatch(setRole("user"));
          }
        } catch (error) {
          console.error("Kullanıcı verisi alınırken bir hata oluştu", error);
          dispatch(setRole(null));
        }
      } else {
        dispatch(setUser(null));
        dispatch(setRole(null));
      }
      dispatch(setisLoading(false));
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (isLoading || role === null) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  if (requiredRole && role === null) {
    return <Navigate to="/" replace />;
  }
  if (requiredRole && role !== requiredRole) {
    toast.error("Bu sayfaya erişiminiz yok.", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

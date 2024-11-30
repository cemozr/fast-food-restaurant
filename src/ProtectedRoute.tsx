import { ReactNode, useEffect } from "react";
import { auth } from "./config/firebase";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./states/store";
import { setisLoading, setRole, setUser } from "./states/authSlice";
import Loading from "./components/UI/Loading";
import { doc, getDoc, getFirestore } from "firebase/firestore";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps): JSX.Element {
  const db = getFirestore();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => {
    return state.authReducer;
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        dispatch(
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
          }),
        );
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          dispatch(setRole(userDoc.data().role));
        } else {
          console.error("rol bulunamadı");
        }
      } else {
        dispatch(setUser(null), setRole(null));
      }
      dispatch(setisLoading(false));
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (state.isLoading) {
    return <Loading />;
  }
  return state.user ? <> {children} </> : <Navigate to="/auth" replace />;
}

import { useSelector } from "react-redux";
import Login from "./Login";
import Register from "./Register";
import { RootState } from "../../../states/store";
import { Navigate } from "react-router-dom";
import Loading from "../../UI/Loading";

export default function Auth() {
  const { isLoggedIn, isRegistered, user, role, isLoading } = useSelector(
    (state: RootState) => {
      return state.authReducer;
    },
  );
  if (isLoggedIn) {
    if (isLoading || role === null) {
      return <Loading />;
    }
    if (role === "admin") {
      return <Navigate to={`/admin/${user?.uid}`} />;
    } else if (role === "user") {
      return <Navigate to={`/user/${user?.uid}`} />;
    }
  }
  return (
    <div className="flex flex-grow items-center justify-center bg-primary bg-opacity-70 lg:bg-opacity-0 lg:bg-none">
      {isRegistered ? <Login /> : <Register />}
    </div>
  );
}

import { useSelector } from "react-redux";
import Login from "./Login";
import Register from "./Register";
import { RootState } from "../../../states/store";
import UserDashBoard from "../dashboards/user/UserDashboard";

export default function Auth() {
  const state = useSelector((state: RootState) => {
    return state.authReducer;
  });

  return (
    <div className="flex flex-grow items-center justify-center bg-primary bg-opacity-70 lg:bg-opacity-0 lg:bg-none">
      {state.isLoggedIn ? (
        <UserDashBoard />
      ) : state.isRegistered ? (
        <Login />
      ) : (
        <Register />
      )}{" "}
    </div>
  );
}

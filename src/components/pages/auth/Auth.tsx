import { useSelector } from "react-redux";
import Login from "./Login";
import Register from "./Register";
import { RootState } from "../../../states/store";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function Auth() {
  const state = useSelector((state: RootState) => {
    return state.authReducer;
  });

  return (
    <div className="flex flex-grow items-center justify-center bg-primary bg-opacity-70 lg:bg-opacity-0 lg:bg-none">
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {state.isLoggedIn ? (
        <Navigate to={`/user/${state.user?.uid}`} />
      ) : state.isRegistered ? (
        <Login />
      ) : (
        <Register />
      )}{" "}
    </div>
  );
}

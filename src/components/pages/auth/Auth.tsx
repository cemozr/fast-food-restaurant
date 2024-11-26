import { useSelector } from "react-redux";
import Login from "./Login";
import Register from "./Register";
import { RootState } from "../../../states/store";

export default function Auth() {
  const isRegistered = useSelector((state: RootState) => {
    return state.authReducer.isRegistered;
  });

  return <>{isRegistered ? <Login /> : <Register />}</>;
}

import { useSelector } from "react-redux";
import Login from "./Login";
import Register from "./Register";
import { RootState } from "../../../states/store";

export default function Auth() {
  const { isRegistered } = useSelector((state: RootState) => {
    return state.authReducer;
  });

  return (
    <div className="flex flex-grow items-center justify-center bg-primary bg-opacity-70 lg:bg-opacity-0 lg:bg-none">
      {isRegistered ? <Login /> : <Register />}
    </div>
  );
}

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../states/store";
import Button from "../../../UI/Button";
import { signOut } from "firebase/auth";
import { auth } from "../../../../config/firebase";
import { setIsLoggedIn, setUser } from "../../../../states/authSlice";

export default function UserDashBoard() {
  const dispatch = useDispatch();
  const { uid } = useParams();
  const user = useSelector((state: RootState) => state.authReducer.user);
  return (
    <div className="flex flex-grow items-center justify-center bg-primary bg-opacity-70 text-txtLight lg:bg-opacity-0 lg:bg-none">
      <Button
        el="button"
        onClick={() => {
          signOut(auth).catch((error) => {
            console.error("Çıkış yaparken bir hata oluştu: ", error);
          });
          dispatch(setIsLoggedIn(false), setUser(null));
        }}
      >
        Çıkış Yap
      </Button>
    </div>
  );
}

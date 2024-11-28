import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../states/store";

export default function UserDashBoard() {
  const { uid } = useParams();
  const user = useSelector((state: RootState) => state.authReducer.user);
  return (
    <div className="flex flex-grow items-center justify-center bg-primary bg-opacity-70 text-txtLight lg:bg-opacity-0 lg:bg-none">
      <p className="text-4xl">Hoşgeldin {user?.displayName}</p>
      <p>Your UID: {uid}</p>
    </div>
  );
}

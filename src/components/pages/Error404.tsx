import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import img from "../../assets/about-img.png";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/store";
import { logout } from "../../states/authSlice";

export default function Error404() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  return (
    <div className="flex w-full flex-grow items-center justify-center gap-10 bg-primary">
      <div>
        <h1 className="my-10 font-dancing text-5xl text-txtLight">
          Sanırım Kayboldun
        </h1>
        <Button
          el="button"
          onClick={() => {
            navigate("/");
          }}
        >
          Ana Sayfaya Dön
        </Button>
        <Button el="button" onClick={() => dispatch(logout())}>
          x
        </Button>
      </div>
      <div className="flex items-center">
        <img src={img} alt="burger-image" className="h-96" />
      </div>
    </div>
  );
}

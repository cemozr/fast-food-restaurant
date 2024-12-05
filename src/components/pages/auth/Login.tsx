import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../UI/Button";
import { loginSchema } from "./authSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CiLogin } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { FaRegSadCry } from "react-icons/fa";
import {
  setisLoading,
  setIsLoggedIn,
  setIsRegistered,
  setUser,
} from "../../../states/authSlice";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../states/store";
import Loading from "../../UI/Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const authStates = useSelector((state: RootState) => {
    return state.authReducer;
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = async (formData) => {
    try {
      dispatch(setisLoading(true));
      setPersistence(auth, browserSessionPersistence);
      const userData = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );

      const user = userData.user;

      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }),
        setIsLoggedIn(true),
      );

      navigate(`/user/${user.uid}`);
    } catch (error) {
      toast.error(
        "Giriş başarısız. Bilgilerinizi kontrol edip tekrar deneyiniz.",
        {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        },
      );
      console.error("Giriş Başarısız.", error);
      dispatch(setisLoading(false));
    }
  };

  authStates.isLoggedIn && dispatch(setisLoading(false));
  return authStates.isLoading ? (
    <Loading />
  ) : (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-10 flex flex-col items-center gap-4 px-6 py-10 text-primary lg:rounded-md lg:bg-primary lg:bg-opacity-70"
      >
        <h1 className="flex items-center font-dancing text-4xl text-txtLight">
          Giriş <CiLogin className="ml-2" />
        </h1>
        <input
          type="text"
          placeholder="E-posta"
          className="h-10 rounded-sm p-3"
          {...register("email")}
        />
        {errors.email && <p className="text-error">{errors.email.message}</p>}
        <input
          type="password"
          placeholder="Şifre"
          className="h-10 rounded-sm p-3"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-error">{errors.password.message}</p>
        )}

        <p className="text-txtLight">
          Hesabın yok mu?{" "}
          <span
            onClick={() => dispatch(setIsRegistered())}
            className="text-secondary underline hover:cursor-pointer hover:text-secondaryDark"
          >
            Kayıt ol
          </span>
        </p>

        <span
          onClick={() => navigate("/forgot-password")}
          className="flex items-center gap-1 text-secondary underline hover:cursor-pointer hover:text-secondaryDark"
        >
          Şifremi unuttum <FaRegSadCry />
        </span>

        <Button el="button" type="submit">
          Giriş Yap
        </Button>
      </form>
    </>
  );
}

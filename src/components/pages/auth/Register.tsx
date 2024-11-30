import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../UI/Button";
import { registerSchema } from "./authSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  setisLoading,
  setIsLoggedIn,
  setIsRegistered,
  setUser,
} from "../../../states/authSlice";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../states/store";
import Loading from "../../UI/Loading";
import { toast } from "react-toastify";

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStates = useSelector((state: RootState) => {
    return state.authReducer;
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const onSubmit: SubmitHandler<RegisterForm> = async (formData) => {
    try {
      dispatch(setisLoading(true));
      const userData = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      const user = userData.user;
      await updateProfile(user, {
        displayName: formData.name,
      });
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }),
      );

      navigate(`/user/${user.uid}`);
      dispatch(setIsLoggedIn(true));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Bilinmeyen hata";

      errorMessage === "Firebase: Error (auth/email-already-in-use)."
        ? toast.error("Kayıt başarısız. Bu e-posta adresi zaten kayıtlı", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
        : toast.error(
            "Kayıt başarısız. Bilgilerinizi kontrol edip tekrar deneyiniz.",
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

      console.error("Kayıt Başarısız", error);

      dispatch(setisLoading(false));
    }
  };
  authStates.isLoggedIn && dispatch(setisLoading(false));
  return authStates.isLoading ? (
    <Loading />
  ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4 py-10 text-primary lg:my-10 lg:rounded-md lg:bg-primary lg:bg-opacity-70"
    >
      <h1 className="flex items-center font-dancing text-4xl text-txtLight">
        Kayıt <FaUser color="white" className="ml-3 text-2xl" />
      </h1>
      <input
        type="text"
        placeholder="İsim"
        className="h-10 rounded-sm p-3"
        {...register("name")}
      />
      {errors.name && <p className="text-error">{errors.name.message}</p>}
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
      <input
        type="password"
        placeholder="Şifre Tekrar"
        className="h-10 rounded-sm p-3"
        {...register("confirmPassword")}
      />
      {errors.confirmPassword && (
        <p className="text-error">{errors.confirmPassword.message}</p>
      )}
      <span className="w-42 flex items-center justify-center gap-2">
        <input type="checkbox" className="mr-1" {...register("confirmTerms")} />

        <p className="w-1/2 text-sm text-txtLight">
          Bilgilerimin kayıt edilmesi ve kullanılmasını onaylıyorum
        </p>
      </span>
      {errors.confirmTerms && (
        <p className="text-error">{errors.confirmTerms.message}</p>
      )}
      <p className="text-txtLight">
        Zaten üye misin?{" "}
        <span
          onClick={() => dispatch(setIsRegistered())}
          className="text-secondary underline hover:cursor-pointer hover:text-secondaryDark"
        >
          Giriş yap!
        </span>
      </p>
      <Button el="button" type="submit">
        Kayıt Ol
      </Button>
    </form>
  );
}

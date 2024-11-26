import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../UI/Button";
import { loginSchema } from "./authSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CiLogin } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { setIsRegistered } from "../../../states/authSlice";

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = () => {};

  return (
    <div className="my-20 flex flex-grow items-center justify-center p-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4 rounded-md bg-primary bg-opacity-70 px-6 py-10 text-primary"
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
            className="text-secondary underline"
          >
            Kayıt Ol
          </span>
        </p>
        <Button el="button" type="submit">
          Giriş Yap
        </Button>
      </form>
    </div>
  );
}

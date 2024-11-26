import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../UI/Button";
import { registerSchema } from "./authSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUser } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setIsRegistered } from "../../../states/authSlice";

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const onSubmit: SubmitHandler<RegisterForm> = () => {};
  return (
    <div className="flex flex-grow items-center justify-center p-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4 rounded-md bg-primary bg-opacity-70 px-6 py-10 text-primary"
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
          <input
            type="checkbox"
            className="mr-1"
            {...register("confirmTerms")}
          />

          <p className="text-sm text-txtLight">
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
            className="text-secondary underline"
          >
            Giriş Yap!
          </span>
        </p>
        <Button el="button" type="submit">
          Kayıt Ol
        </Button>
      </form>
    </div>
  );
}

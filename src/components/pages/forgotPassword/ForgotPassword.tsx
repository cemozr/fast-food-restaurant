import Button from "../../UI/Button";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { forgotPasswordSchema } from "./forgotPasswordSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { toast } from "react-toastify";

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordForm> = async (formData) => {
    if (!formData) {
      return;
    }

    await sendPasswordResetEmail(auth, formData.email)
      .then(() =>
        toast.success(
          "Şifrenizi değiştirebilmeniz için size bir mail gönderdik lütfen hesabınızı kontrol edin.",
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
        ),
      )
      .then(() => navigate("/auth"))
      .catch((error) => {
        console.error(error);
        toast.error("Bir hata meydana geldi", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <div className="flex flex-grow items-center justify-center bg-primary bg-opacity-70 lg:bg-opacity-0 lg:bg-none">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-10 flex flex-col items-center gap-4 px-6 py-10 text-primary lg:rounded-md lg:bg-primary lg:bg-opacity-70"
      >
        <h1 className="flex items-center font-dancing text-4xl text-txtLight">
          Şifremi unuttum
        </h1>
        <input
          type="text"
          placeholder="E-posta"
          className="h-10 rounded-sm p-3"
          {...register("email")}
        />
        {errors.email && <p className="text-error">{errors.email.message}</p>}
        <p className="flex gap-2 text-txtLight">
          Kayıt sayfasına{" "}
          <span
            onClick={() => navigate("/auth")}
            className="flex items-center gap-1 text-secondary underline hover:cursor-pointer hover:text-secondaryDark"
          >
            geri dön
          </span>
        </p>
        <Button el="button" type="submit">
          Şifremi Yenile
        </Button>
      </form>
    </div>
  );
}

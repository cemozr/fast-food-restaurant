import { z } from "zod";
import Button from "./UI/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(2, "Lütfen geçerli bir isim giriniz."),
  tel: z.string().min(10, "Lütfen geçerli bir telefon numarası giriniz."),
  email: z.string().email("Lütfen geçerli bir e-posta adresi giriniz."),
  count: z.string().min(1, "Bu alan boş bırakılamaz."),
  date: z
    .string()
    .min(8, "Lütfen geçerli bir tarih giriniz.")
    .max(10, "Lütfen geçerli bir tarih giriniz."),
});

type Form = z.infer<typeof formSchema>;
type BookingFormProps = {
  setIsSubmitted: (isSubmitted: boolean) => void;
};
export default function BookingForm({ setIsSubmitted }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Form> = async (data) => {
    if (!isSubmitSuccessful) {
      alert("Bir şeyler yanlış gitti lütfen daha sonra tekrar deneyiniz.");
    }
    setIsSubmitted(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);

    console.log(data);
  };

  return (
    <div className="flex flex-col gap-3 lg:w-1/2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-start justify-center gap-4 p-4"
      >
        <h1 className="font-dancing text-4xl">Rezervasyon</h1>
        <input
          {...register("name")}
          className="w-full rounded-md border-2 border-bgDark p-3"
          type="text"
          placeholder="İsim"
        />
        {errors.name && <p className="text-error">{errors.name.message}</p>}
        <input
          {...register("tel")}
          className="w-full rounded-md border-2 border-bgDark p-3"
          type="number"
          placeholder="Telefon"
        />
        {errors.tel && <p className="text-error">{errors.tel.message}</p>}
        <input
          {...register("email")}
          className="w-full rounded-md border-2 border-bgDark p-3"
          type="email"
          placeholder="E-posta"
        />
        {errors.email && <p className="text-error">{errors.email.message}</p>}
        <input
          {...register("count")}
          className="w-full rounded-md border-2 border-bgDark p-3"
          type="number"
          placeholder="Kişi sayısı"
        />
        {errors.count && <p className="text-error">{errors.count.message}</p>}
        <input
          {...register("date")}
          className="w-full rounded-md border-2 border-bgDark p-3"
          type="date"
          placeholder="gg.aa.yyyy"
        />
        {errors.date && <p className="text-error">{errors.date.message}</p>}
        <Button type="submit" el="button">
          Talep Oluştur
        </Button>
      </form>
    </div>
  );
}

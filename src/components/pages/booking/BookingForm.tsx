import { z } from "zod";
import Button from "../../UI/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import formSchema from "./formSchema";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../../states/store";
import { useDispatch } from "react-redux";
import { addBooking, Booking } from "../../../states/bookingSlice";
import { toast } from "react-toastify";
import Loading from "../../UI/Loading";

type Form = z.infer<typeof formSchema>;

export default function BookingForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
  });

  const dispatch: AppDispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Form> = async (data) => {
    setIsLoading(true);

    const booking: Booking = {
      name: data.name,
      tel: data.tel,
      email: data.email,
      count: data.count,
      date: data.date,
      status: "Beklemede",
    };
    try {
      dispatch(addBooking(booking));
      toast.success(
        "Rezervasyon talebinizi oluşturuldu. En kısa zamanda doğrulama için size ulaşacağız.",
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
    } catch (err) {
      console.error("addBook failed", err);
      toast.error("Bir hata meydana geldi rezervasyon talebi oluşturulamadı.", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    // console.log(data);
  };
  useEffect(() => {
    setIsLoading(false);
    reset();
  }, [isSubmitSuccessful]);
  return (
    <div className="flex flex-col gap-3 lg:w-1/2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-start justify-center gap-4 p-4"
      >
        {isLoading && <Loading />}
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
          type="string"
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

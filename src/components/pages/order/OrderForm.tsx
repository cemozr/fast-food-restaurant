import { SubmitHandler, useForm } from "react-hook-form";
import orderFormSchema from "./orderFormSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Loading from "../../UI/Loading";
import Button from "../../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../states/store";
import { useNavigate } from "react-router-dom";
import { setConfirmedOrderData } from "../../../states/orderSlice";

type OrderFormType = z.infer<typeof orderFormSchema>;

export default function OrderForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.authReducer);
  const { orderList, totalPrice } = useSelector(
    (state: RootState) => state.orderReducer,
  );
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<OrderFormType>({
    resolver: zodResolver(orderFormSchema),
  });

  const onSubmit: SubmitHandler<OrderFormType> = async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
      dispatch(
        setConfirmedOrderData({
          userId: user?.uid,
          userInfo: {
            name: data.name,
            tel: data.tel,
            address: data.address,
          },
          items: orderList.map((order) => {
            return {
              id: order.id,
              name: order.name,
              image: order.image,
              price: order.price,
              count: order.count,
            };
          }),
          totalPrice: totalPrice,
          status: "Beklemede",
        }),
      );

      navigate(`/user/${user?.uid}/order-form/order-confirmation`);
    } catch (err) {
      console.error("siparişte hata", err);
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      setIsLoading(false);
      reset();
    }
  }, [isSubmitSuccessful]);
  return (
    <div className="flex flex-grow flex-col items-center justify-center bg-primary bg-opacity-70">
      <h1 className="py-4 text-center font-dancing text-3xl text-txtLight">
        İletişim Bilgileri
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-10 flex w-full flex-col items-end gap-4 px-4 lg:w-1/2"
      >
        {isLoading && <Loading />}

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
          type="text"
          placeholder="Telefon"
        />
        {errors.tel && <p className="text-error">{errors.tel.message}</p>}
        <textarea
          {...register("address")}
          className="w-full rounded-md border-2 border-bgDark p-3"
          placeholder="Adres"
        />
        {errors.address && (
          <p className="text-error">{errors.address.message}</p>
        )}

        <Button type="submit" el="button">
          Devam Et
        </Button>
      </form>
    </div>
  );
}

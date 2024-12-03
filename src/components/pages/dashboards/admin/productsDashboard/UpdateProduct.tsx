import { useState } from "react";
import Loading from "../../../../UI/Loading";
import Button from "../../../../UI/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../states/store";
import { productSchema } from "./productSchema";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type ProductForm = z.infer<typeof productSchema>;

export default function UpdateProduct() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.authReducer.user);
  const { selectedProduct } = useSelector(
    (state: RootState) => state.productReducer,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
  });
  const onSubmit: SubmitHandler<ProductForm> = async (formData) => {};
  return (
    <div className="flex flex-grow flex-col items-center justify-center bg-primary bg-opacity-70 py-10">
      <h1 className="font-dancing text-3xl text-txtLight">Ürünü Güncelle</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4 p-4 text-txtDark md:grid md:grid-cols-2"
      >
        {isLoading && <Loading />}

        <input
          type="text"
          placeholder="Ürün Adı"
          className="h-10 rounded-sm p-3"
          //   value={selectedProduct.name}
          {...register("name")}
        />
        {errors.name && <p className="text-error">{errors.name.message}</p>}
        <input
          type="text"
          placeholder="Ürün Kategorisi"
          className="h-10 rounded-sm p-3"
          //   value={selectedProduct.category}
          {...register("category")}
        />
        {errors.category && (
          <p className="text-error">{errors.category.message}</p>
        )}
        <input
          type="text"
          placeholder="Ürün Açıklaması"
          className="h-10 rounded-sm p-3"
          //   value={selectedProduct.description}
          {...register("description")}
        />
        {errors.description && (
          <p className="text-error">{errors.description.message}</p>
        )}
        <input
          type="number"
          placeholder="Ürün Fiyatı"
          className="h-10 rounded-sm p-3"
          //   value={selectedProduct.price}
          {...register("price")}
        />
        {errors.price && <p className="text-error">{errors.price.message}</p>}

        <input
          id="img"
          type="file"
          accept="image/*"
          placeholder="Ürün Görseli"
          className="text-txtLight file:ml-10 file:rounded-md file:bg-secondary file:p-2 file:text-txtLight file:hover:cursor-pointer file:hover:bg-secondaryDark md:file:ml-0"
          {...register("image")}
        />
        {errors.image && <p className="text-error">{errors.image.message}</p>}
        <div className="flex justify-center">
          <Button el="button" type="submit">
            Ürünü Güncelle
          </Button>
        </div>
      </form>
      <div className="mt-5">
        <Button
          el="button"
          onClick={() => navigate(`/user/${user?.uid}/dashboard`)}
        >
          Geri Dön
        </Button>
      </div>
    </div>
  );
}

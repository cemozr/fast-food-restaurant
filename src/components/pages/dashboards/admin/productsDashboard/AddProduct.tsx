import { z } from "zod";
import Button from "../../../../UI/Button";
import { productSchema } from "./productSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { addProduct, uploadImage } from "../../../../../states/productSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../states/store";
import { toast } from "react-toastify";
import { setisLoading } from "../../../../../states/authSlice";
import Loading from "../../../../UI/Loading";

type ProductForm = z.infer<typeof productSchema>;

export default function AddProduct() {
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit: SubmitHandler<ProductForm> = async (formData) => {
    setIsLoading(true);
    try {
      const imageUrl = await uploadImage(formData.image);

      const product = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        price: formData.price,
        imageUrl: imageUrl,
      };
      console.log(product);
      await dispatch(addProduct(product));
      toast.success("Ürün başarıyla eklendi.", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Hata: ", error);
      toast.error("Bir hata meydana geldi ürün eklenemedi.", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      console.log("Loading state is being set to false");
      setisLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4 py-8 text-txtDark lg:my-10 lg:rounded-md lg:bg-primary lg:bg-opacity-70"
    >
      {isLoading && <Loading />}
      <h1 className="font-dancing text-3xl text-txtLight">Ürün Ekle</h1>
      <input
        type="text"
        placeholder="Ürün Adı"
        className="h-10 rounded-sm p-3"
        {...register("name")}
      />
      {errors.name && <p className="text-error">{errors.name.message}</p>}
      <input
        type="text"
        placeholder="Ürün Kategorisi"
        className="h-10 rounded-sm p-3"
        {...register("category")}
      />
      {errors.category && (
        <p className="text-error">{errors.category.message}</p>
      )}
      <input
        type="text"
        placeholder="Ürün Açıklaması"
        className="h-10 rounded-sm p-3"
        {...register("description")}
      />
      {errors.description && (
        <p className="text-error">{errors.description.message}</p>
      )}
      <input
        type="number"
        placeholder="Ürün Fiyatı"
        className="h-10 rounded-sm p-3"
        {...register("price")}
      />
      {errors.price && <p className="text-error">{errors.price.message}</p>}
      <p className="text-txtLight">Ürün Görseli Seçiniz</p>
      <input
        type="file"
        accept="image/*"
        placeholder="Ürün Görseli"
        className="text-txtLight file:ml-10 file:rounded-md file:bg-secondary file:p-2 file:text-txtLight file:hover:cursor-pointer file:hover:bg-secondaryDark"
        {...register("image")}
      />
      {errors.image && <p className="text-error">{errors.image.message}</p>}
      <Button el="button" type="submit">
        Ürün Ekle
      </Button>
    </form>
  );
}

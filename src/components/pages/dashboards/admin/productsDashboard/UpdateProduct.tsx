import { useEffect, useState } from "react";
import Loading from "../../../../UI/Loading";
import Button from "../../../../UI/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../states/store";
import { productSchema } from "./productSchema";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  fetchProducts,
  updateProduct,
  uploadImage,
} from "../../../../../states/productSlice";
import { toast } from "react-toastify";

type ProductForm = z.infer<typeof productSchema>;

export default function UpdateProduct() {
  const dispatch: AppDispatch = useDispatch();
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>(selectedProduct.name);
  const [category, setCategory] = useState<string>(selectedProduct.category);
  const [description, setDescription] = useState<string>(
    selectedProduct.description,
  );
  const [price, setPrice] = useState<number>(selectedProduct.price);

  const onSubmit: SubmitHandler<ProductForm> = async (formData) => {
    setIsLoading(true);

    try {
      const imageUrl = await uploadImage(formData.image);
      const productToUpdate = {
        id: selectedProduct.id,
        name: formData.name,
        category: formData.category,
        description: formData.description,
        price: formData.price,
        imageUrl: imageUrl,
      };
      await updateProduct(productToUpdate);
      toast.success("Ürün başarıyla güncellendi.", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(fetchProducts());
    } catch (error) {
      console.error("Couldn't update product", error);
      setIsLoading(false);
      toast.error("Ürün güncellenemedi.", {
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
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setIsLoading(false);
      navigate(`/user/${user?.uid}`);
    }
  }, [isSubmitSuccessful]);
  return (
    <div className="flex flex-grow flex-col items-center justify-center bg-primary bg-opacity-70 py-10">
      <h1 className="font-dancing text-3xl text-txtLight">Ürünü Güncelle</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4 p-4 text-txtDark md:grid md:grid-cols-2"
      >
        {isLoading && <Loading />}
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Ürün Adı"
            className="h-10 rounded-sm p-3"
            value={name}
            {...register("name", { onChange: (e) => setName(e.target.value) })}
          />

          {errors.name && <p className="text-error">{errors.name.message}</p>}
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Ürün Kategorisi"
            className="h-10 rounded-sm p-3"
            value={category}
            {...register("category", {
              onChange: (e) => setCategory(e.target.value),
            })}
          />
          {errors.category && (
            <p className="text-error">{errors.category.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Ürün Açıklaması"
            className="h-10 rounded-sm p-3"
            value={description}
            {...register("description", {
              onChange: (e) => setDescription(e.target.value),
            })}
          />
          {errors.description && (
            <p className="text-error">{errors.description.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <input
            type="number"
            placeholder="Ürün Fiyatı"
            className="h-10 rounded-sm p-3"
            value={price}
            {...register("price", {
              onChange: (e) => setPrice(e.target.value),
            })}
          />
          {errors.price && <p className="text-error">{errors.price.message}</p>}
        </div>
        <div className="flex flex-col">
          <input
            id="img"
            type="file"
            accept="image/*"
            placeholder="Ürün Görseli"
            className="text-txtLight file:ml-10 file:rounded-md file:bg-secondary file:p-2 file:text-txtLight file:hover:cursor-pointer file:hover:bg-secondaryDark md:file:ml-0"
            {...register("image")}
          />
          {errors.image && <p className="text-error">{errors.image.message}</p>}
        </div>
        <div className="flex justify-center">
          <Button el="button" type="submit">
            Ürünü Güncelle
          </Button>
        </div>
      </form>
      <div className="mt-5">
        <Button el="button" onClick={() => navigate(`/user/${user?.uid}`)}>
          Geri Dön
        </Button>
      </div>
    </div>
  );
}

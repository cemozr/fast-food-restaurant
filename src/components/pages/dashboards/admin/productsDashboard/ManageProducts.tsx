import { useEffect } from "react";
import Button from "../../../../UI/Button";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../states/store";
import { fetchProducts } from "../../../../../states/productSlice";
import Loading from "../../../../UI/Loading";
import { toast } from "react-toastify";

export default function ManageProduct() {
  const dispatch: AppDispatch = useDispatch();
  const productStates = useSelector((state: RootState) => {
    return state.productReducer;
  });
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (productStates.status === "loading") return <Loading />;
  if (productStates.status === "failed")
    return toast.error("Ürünler Yüklenemedi", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  return (
    <div className="flex flex-col items-center gap-4 py-8 text-txtLight lg:my-10 lg:rounded-md lg:bg-primary lg:bg-opacity-70">
      <h1 className="font-dancing text-3xl">Ürünleriniz</h1>

      <ul className="grid grid-cols-1 gap-2 p-3 md:grid-cols-2 lg:grid-cols-3">
        {productStates.products.map((product) => {
          return (
            <li
              key={product.id}
              className="flex flex-col gap-1 rounded-md bg-primary p-2"
            >
              <div className="flex gap-2">
                <img
                  className="h-14 w-14 rounded-md"
                  src={product.imageUrl}
                  alt=""
                />
                <div className="w-full">
                  <p>{product.name}</p>
                  <p>{product.category}</p>
                </div>
                <p className="text-2xl">{product.price}₺</p>
              </div>
              <div className="flex">
                <p className="w-full pr-3">{product.description}</p>
                <div className="flex flex-col gap-4 text-2xl">
                  <Button
                    el="button-with-icon"
                    className="hover:text-secondary"
                  >
                    <FaEdit />
                  </Button>
                  <Button el="button-with-icon" className="hover:text-error">
                    <MdDelete />
                  </Button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

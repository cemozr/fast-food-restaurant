import { useEffect } from "react";
import Button from "../../../../UI/Button";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../states/store";
import {
  deleteProduct,
  fetchProducts,
  setSelectedProduct,
} from "../../../../../states/productSlice";
import Loading from "../../../../UI/Loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ManageProducts() {
  const dispatch: AppDispatch = useDispatch();
  const productStates = useSelector((state: RootState) => {
    return state.productReducer;
  });
  const authStates = useSelector((state: RootState) => {
    return state.authReducer;
  });
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, deleteProduct]);

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

  return productStates.status === "loading" ? (
    <Loading />
  ) : (
    <div className="flex flex-col items-center gap-4 px-2 py-12 text-txtLight lg:rounded-md">
      <h1 className="font-dancing text-3xl">Ürünleriniz</h1>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:mx-5 lg:grid-cols-3">
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
                    onClick={() => {
                      dispatch(setSelectedProduct(product));
                      navigate(
                        `/user/${authStates.user?.uid}/dashboard/update-product`,
                      );
                    }}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    el="button-with-icon"
                    className="hover:text-error"
                    onClick={() => {
                      deleteProduct(product.id);
                      dispatch(fetchProducts());
                    }}
                  >
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

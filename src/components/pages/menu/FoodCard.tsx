import { useDispatch, useSelector } from "react-redux";
import Button from "../../UI/Button";
import { addToCart, setIsCartActive } from "../../../states/orderSlice";
import { Product } from "../../../states/productSlice";
import { toast } from "react-toastify";
import { RootState } from "../../../states/store";

type FoodCardProps = {
  product: Product;
};

export default function FoodCard({ product }: FoodCardProps) {
  const { isCartActive } = useSelector(
    (state: RootState) => state.orderReducer,
  );
  const dispatch = useDispatch();
  return (
    <div className="p-4 text-txtLight">
      <div className="relative top-5 z-20 flex h-48 justify-center rounded-bl-3xl rounded-tl-2xl rounded-tr-2xl bg-bgDark">
        <img
          className="w-40 p-5 py-10"
          src={product.imageUrl}
          alt="meal image"
        />
      </div>
      <div className="grid h-80 gap-2 rounded-bl-2xl rounded-br-2xl bg-primary px-6 pb-6 pt-10">
        <h2 className="font-dancing text-2xl">{product.name}</h2>
        <p>{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg">{product.price}₺</span>
          <Button
            el="button-add-cart"
            onClick={() => {
              dispatch(
                addToCart({
                  id: product.id,
                  name: product.name,
                  image: product.imageUrl,
                  price: product.price,
                  count: 1,
                }),
              );
              toast.success("Sepete Eklendi.", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              if (!isCartActive) {
                dispatch(setIsCartActive());
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button";
import { ImCross } from "react-icons/im";
import { calculateTotal, setIsCartActive } from "../../states/cartSlice";
import CartItem from "./CartItem";
import { RootState } from "../../states/store";
import { useEffect } from "react";
export default function Cart() {
  const dispatch = useDispatch();
  const orderList = useSelector((state: RootState) => {
    return state.cartReducer.orderList;
  });
  const totalPrice = useSelector((state: RootState) => {
    return state.cartReducer.totalPrice;
  });
  useEffect(() => {
    dispatch(calculateTotal());
  }, [totalPrice, orderList]);

  return (
    <div
      id="cart"
      className="fixed right-0 top-0 z-20 h-full w-full bg-primary pl-2 lg:w-1/4 lg:rounded-bl-md"
    >
      <div className="flex items-center">
        <Button
          el="button-with-icon"
          onClick={() => dispatch(setIsCartActive())}
        >
          <ImCross className="m-4 text-2xl text-txtLight" />
        </Button>
        <h2 className="w-3/4 text-center font-dancing text-3xl font-medium text-txtLight">
          Sepetim
        </h2>
      </div>
      <div className="max-h-[calc(100vh-5rem)] overflow-y-auto pr-2">
        {orderList.map((order) => {
          return <CartItem key={order.id} order={order} />;
        })}
      </div>
      <div className="my-2 h-px w-full bg-bg"></div>
      <h3 className="font-dancing text-2xl text-txtLight">
        Toplam Tutar : {totalPrice} ₺
      </h3>
    </div>
  );
}

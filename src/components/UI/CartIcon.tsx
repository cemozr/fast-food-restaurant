import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../states/store";

export default function () {
  const { orderList } = useSelector((state: RootState) => state.orderReducer);
  return (
    <div className="h-full">
      <FaShoppingCart
        color="white"
        className="absolute text-xl hover:fill-secondary"
      />

      <div
        className={`${orderList.length ? "relative" : "invisible"} left-3 top-3 z-30 h-5 w-5 rounded-full bg-secondary`}
      >
        <p className="relative -top-1 text-lg font-semibold text-primary">
          {orderList.length}
        </p>
      </div>
    </div>
  );
}

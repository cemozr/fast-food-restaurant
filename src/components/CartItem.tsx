import Button from "./UI/Button";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import {
  decrement,
  increment,
  Order,
  removeFromCart,
} from "../states/cartSlice";
import { useDispatch } from "react-redux";

type CartItemProps = {
  order: Order;
};

export default function CartItem({ order }: CartItemProps) {
  const dispatch = useDispatch();

  return (
    <div className="my-4 flex w-full items-center justify-between gap-2 rounded-bl-xl bg-bg px-2 py-3 font-medium text-txtDark">
      <div className="flex w-3/4 items-center justify-between gap-2">
        <img
          className="h-14 w-14 rounded-md"
          src={order.image}
          alt="food-image"
        />
        <p className="w-2/4">{order.name}</p>
        <p className="w-1/4 text-center">{order.price} ₺</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <Button
          el="button-with-icon"
          onClick={() => dispatch(increment({ id: order.id }))}
          className="text-primary hover:text-secondary"
        >
          <FaPlus />
        </Button>
        <p>{order.count}</p>
        <Button
          el="button-with-icon"
          onClick={() => dispatch(decrement({ id: order.id }))}
          className="text-primary hover:text-secondary"
        >
          <FaMinus />
        </Button>
      </div>
      <Button
        el="button-with-icon"
        onClick={() => dispatch(removeFromCart({ id: order.id }))}
        className="pr-1 text-xl text-primary hover:text-error"
      >
        <MdDelete />
      </Button>
    </div>
  );
}

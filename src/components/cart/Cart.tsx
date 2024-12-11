import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button";
import { ImCross } from "react-icons/im";
import { calculateTotal, setIsCartActive } from "../../states/orderSlice";
import CartItem from "./CartItem";
import { RootState } from "../../states/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoggedIn, role } = useSelector(
    (state: RootState) => state.authReducer,
  );
  const { orderList, totalPrice } = useSelector(
    (state: RootState) => state.orderReducer,
  );

  useEffect(() => {
    dispatch(calculateTotal());
  }, [totalPrice, orderList]);
  const handleOrder = () => {
    if (orderList.length === 0) {
      return toast.error("Sepetiniz boş. Menüden ürün ekleyebilirsiniz.", {
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
    if (isLoggedIn && role !== null) {
      navigate(`/user/${user?.uid}/order-form`);
    } else {
      toast.info(
        "Lütfen önce giriş yapınız. Bir üyeliğiniz yoksa ücretsiz bir şekilde üyelik oluşturabilirsiniz.",
        {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        },
      );
      navigate("/auth");
    }
    dispatch(setIsCartActive());
  };
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
        <div className="my-2 h-px w-full bg-bg"></div>
        <h3 className="font-dancing text-2xl text-txtLight">
          Toplam Tutar : {totalPrice} ₺
        </h3>
        <div className="flex justify-center pb-10 pt-5">
          <Button el="button" onClick={handleOrder}>
            Sipariş oluştur
          </Button>
        </div>
      </div>
    </div>
  );
}

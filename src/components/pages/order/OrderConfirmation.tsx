import { useState } from "react";
import Button from "../../UI/Button";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../states/store";
import { createOrder } from "../../../states/orderSlice";
import { toast } from "react-toastify";
import Loading from "../../UI/Loading";
import usePagination from "../../../hooks/usePagination";

const tableCols = ["Ürün Görseli", "Ürün Adı", "Fiyat", "Adet"];

export default function OrderConfirmation() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.authReducer);
  const { confirmedOrderData } = useSelector(
    (state: RootState) => state.orderReducer,
  );
  const navigate = useNavigate();

  const {
    startIndex,
    endIndex,
    displayedItems,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
  } = usePagination({ itemList: confirmedOrderData.items, itemsPerPage: 3 });

  const handleOrderConfirm = () => {
    setIsLoading(true);
    try {
      dispatch(createOrder(confirmedOrderData));
      toast.success("Siparişiniz Oluşturuldu. Afiyet Olsun", {
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
      console.error("Order failed");
      toast.error(
        "Üzgünüz siparişiniz başarısız. Bir hata meydana geldi. Lütfen bize ulaşın.",
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
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex h-full w-full flex-grow flex-col items-center justify-center bg-primary bg-opacity-70">
      <h1 className="py-4 text-center font-dancing text-3xl text-txtLight">
        Sipariş Özeti
      </h1>
      {isLoading && <Loading />}
      <div className="relative mb-5 flex w-full flex-col overflow-scroll bg-clip-border text-txtLight lg:w-3/4 lg:overflow-hidden lg:rounded-lg">
        <table className="min-w-max table-auto text-left">
          <thead>
            <tr>
              {tableCols.map((col, i) => {
                return (
                  <th key={i} className="bg-secondaryDark p-4">
                    <p className="font-semibold leading-none text-txtLight">
                      {col}
                    </p>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {displayedItems.map((item) => {
              return (
                <tr
                  key={item.id}
                  className="border-b border-txtLight hover:bg-primary"
                >
                  <td className="p-4 py-5">
                    <img
                      src={item.image}
                      alt="meal-image"
                      className="h-14 w-14 rounded-md"
                    />
                  </td>
                  <td className="p-4 py-5">
                    <p className="block text-sm font-semibold text-txtLight">
                      {item.name}
                    </p>
                  </td>
                  <td className="p-4 py-5">
                    <p className="block text-sm font-semibold text-txtLight">
                      {item.price} ₺
                    </p>
                  </td>
                  <td className="p-4 py-5">
                    <p className="block text-sm font-semibold text-txtLight">
                      {item.count}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="text-sm text-secondary">
            Gösterilen:{" "}
            <b>
              {startIndex} - {endIndex}
            </b>{" "}
            Toplam: <b> {confirmedOrderData.items.length}</b> Çeşit Ürün
          </div>
          <div className="flex space-x-2">
            <Button
              el="button-with-icon"
              onClick={previousPage}
              disabled={currentPage === 1}
            >
              <MdArrowBackIos className="text-xl hover:text-secondary" />
            </Button>
            <Button
              el="button-with-icon"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              <MdArrowForwardIos className="text-xl hover:text-secondary" />
            </Button>
          </div>
        </div>
      </div>
      <div className="mb-4 w-2/3 text-end lg:mb-0">
        <h3 className="font-dancing text-2xl text-txtLight">
          Toplam Tutar: {confirmedOrderData.totalPrice} ₺
        </h3>
      </div>
      <div className="flex w-2/3 flex-col text-txtLight">
        <p>
          <b>İsim:</b> {confirmedOrderData.userInfo.name}
        </p>
        <p>
          <b>Telefon:</b> {confirmedOrderData.userInfo.tel}
        </p>
        <p>
          <b>Adres:</b> {confirmedOrderData.userInfo.address}
        </p>
      </div>
      <div className="my-5 flex w-full flex-col items-center gap-4 md:flex-row md:justify-around">
        <Button
          el="button"
          onClick={() => navigate(`/user/${user?.uid}/order-form`)}
        >
          Geri Dön
        </Button>
        <Button el="button" onClick={handleOrderConfirm}>
          Siparişi Onayla
        </Button>
      </div>
    </div>
  );
}

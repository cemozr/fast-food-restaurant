import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../states/store";
import Button from "../../../UI/Button";
import { logout } from "../../../../states/authSlice";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import usePagination from "../../../../hooks/usePagination";
import { useEffect } from "react";
import { cancelOrder, fetchOrders } from "../../../../states/orderSlice";
import { useNavigate } from "react-router-dom";

const tableCols: string[] = [
  "Sipariş Tarihi",
  "Ürünler",
  "Toplam Tutar",
  "Adres",
  "Durum",
  " ",
];

export default function UserDashBoard() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { confirmedOrders } = useSelector(
    (state: RootState) => state.orderReducer,
  );
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const {
    currentPage,
    displayedItems,
    endIndex,
    nextPage,
    previousPage,
    startIndex,
    totalPages,
  } = usePagination({ itemList: confirmedOrders, itemsPerPage: 2 });

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="flex flex-grow flex-col items-center justify-center bg-primary bg-opacity-70 text-txtLight lg:px-10">
      <h1 className="my-5 font-dancing text-3xl">Siparişleriniz</h1>
      <div className="relative mb-5 flex w-full flex-col overflow-scroll bg-clip-border text-txtLight lg:overflow-hidden lg:rounded-lg">
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
              const formattedDate = item.createdAt
                ? new Date(item.createdAt).toLocaleString("tr-TR", {
                    timeZone: "Europe/Istanbul",
                  })
                : "Tarih bilgisi yok";
              return (
                <tr
                  key={item.id}
                  className="border-b border-txtLight hover:bg-primary"
                >
                  <td className="p-4 py-5">
                    <p className="block text-sm font-semibold text-txtLight">
                      {formattedDate}
                    </p>
                  </td>
                  <td className="p-4 py-5">
                    {item.items.map((product) => {
                      return (
                        <p
                          key={product.id}
                          className="block text-sm font-semibold text-txtLight"
                        >
                          {product.name} x <b>{product.count}</b>
                        </p>
                      );
                    })}
                  </td>
                  <td className="p-4 py-5">
                    <p className="block text-sm font-semibold text-txtLight">
                      {item.totalPrice} ₺
                    </p>
                  </td>
                  <td className="p-4 py-5">
                    <p className="block text-sm font-semibold text-txtLight">
                      {item.userInfo.address}
                    </p>
                  </td>
                  <td className="p-4 py-5">
                    <p className="block text-sm font-semibold text-txtLight">
                      {item.status}
                    </p>
                  </td>
                  <td className="p-4 py-5">
                    <Button
                      el="button-with-icon"
                      onClick={() => {
                        cancelOrder(item.id!);
                        dispatch(fetchOrders());
                      }}
                      disabled={item.status === "İptal Edildi"}
                    >
                      <ImCancelCircle className="text-lg hover:text-error" />
                    </Button>
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
            Toplam: <b> {confirmedOrders.length}</b> Sipariş
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
      <Button el="button" onClick={handleLogout}>
        Çıkış Yap
      </Button>
    </div>
  );
}

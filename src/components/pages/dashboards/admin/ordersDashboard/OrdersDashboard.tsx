import { useDispatch, useSelector } from "react-redux";
import usePagination from "../../../../../hooks/usePagination";
import { AppDispatch, RootState } from "../../../../../states/store";
import {
  fetchAllOrders,
  OrderStatus,
  updateOrderStatus,
} from "../../../../../states/orderSlice";
import Button from "../../../../UI/Button";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useEffect } from "react";

export default function OrdersDashboard() {
  const { confirmedOrders } = useSelector(
    (state: RootState) => state.orderReducer,
  );
  const dispatch: AppDispatch = useDispatch();
  const {
    currentPage,
    displayedItems,
    endIndex,
    nextPage,
    previousPage,
    startIndex,
    totalPages,
  } = usePagination({ itemList: confirmedOrders, itemsPerPage: 3 });

  useEffect(() => {
    dispatch(fetchAllOrders());
    const interval = setInterval(() => {
      dispatch(fetchAllOrders());
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const tableCols: string[] = [
    "Sipariş Tarihi",
    "Ürünler",
    "Toplam Tutar",
    "İsim",
    "Adres",
    "Telefon",
    "Durum",
    " ",
  ];

  return (
    <div className="relative flex h-full w-full flex-grow flex-col overflow-scroll overflow-y-hidden bg-primary bg-opacity-70 bg-clip-border py-3 text-txtLight lg:m-10 lg:rounded-lg xl:overflow-hidden">
      <h1 className="mb-5 text-center font-dancing text-3xl">
        Rezervasyonlarım
      </h1>
      <table className="h-full w-full min-w-max table-auto text-left">
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
          {displayedItems.map((item, i) => {
            return (
              <tr key={i} className="border-b border-txtLight hover:bg-primary">
                <td className="p-4 py-5">
                  <p className="block text-sm font-semibold text-txtLight">
                    {item.createdAt}
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
                    {item.userInfo.name}
                  </p>
                </td>
                <td className="p-4 py-5">
                  <p className="block text-sm font-semibold text-txtLight">
                    {item.userInfo.address}
                  </p>
                </td>
                <td className="p-4 py-5">
                  <p className="block text-sm font-semibold text-txtLight">
                    {item.userInfo.tel}
                  </p>
                </td>
                <td className="p-4 py-5">
                  <select
                    className="rounded-sm bg-secondary px-2 text-primary hover:cursor-pointer"
                    id="status"
                    value={item.status}
                    onChange={(e) => {
                      updateOrderStatus(
                        item.id!,
                        e.target.value as OrderStatus,
                      );
                      dispatch(fetchAllOrders());
                    }}
                  >
                    <option value="Beklemede">Beklemede</option>
                    <option value="Hazırlanıyor">Hazırlanıyor</option>
                    <option value="Yola Çıktı">Yola Çıktı</option>
                    <option value="Teslim Edildi">Teslim Edildi</option>
                    <option value="İptal Edildi">İptal Edildi</option>
                  </select>
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
            {startIndex + 1} - {endIndex}
          </b>{" "}
          Toplam: {confirmedOrders.length}
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
  );
}

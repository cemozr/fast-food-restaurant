import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../states/store";
import { useEffect } from "react";
import Button from "../../../../UI/Button";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";
import {
  fetchBookings,
  updateBookingStatus,
} from "../../../../../states/bookingSlice";
import usePagination from "../../../../../hooks/usePagination";
const tableCols = [
  "İsim",
  "Telefon",
  "E-posta",
  "Kişi Sayısı",
  "Tarih",
  "Durum",
];

export default function BookingsDashboard() {
  const { bookings } = useSelector((state: RootState) => state.bookingReducer);
  const dispatch: AppDispatch = useDispatch();

  const {
    currentPage,
    displayedItems,
    endIndex,
    nextPage,
    previousPage,
    startIndex,
    totalPages,
  } = usePagination({ itemList: bookings, itemsPerPage: 4 });

  useEffect(() => {
    dispatch(fetchBookings());
    const interval = setInterval(() => {
      dispatch(fetchBookings());
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="relative flex h-full w-full flex-col overflow-scroll bg-primary bg-opacity-70 bg-clip-border py-3 text-txtLight lg:w-3/4 lg:overflow-hidden lg:rounded-lg">
      <h1 className="mb-5 text-center font-dancing text-3xl">
        Rezervasyonlarım
      </h1>
      <table className="w-full min-w-max table-auto text-left">
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
                    {item.name}
                  </p>
                </td>
                <td className="p-4 py-5">
                  <p className="block text-sm font-semibold text-txtLight">
                    {item.tel}
                  </p>
                </td>
                <td className="p-4 py-5">
                  <p className="block text-sm font-semibold text-txtLight">
                    {item.email}
                  </p>
                </td>
                <td className="p-4 py-5">
                  <p className="block text-sm font-semibold text-txtLight">
                    {item.count}
                  </p>
                </td>
                <td className="p-4 py-5">
                  <p className="block text-sm font-semibold text-txtLight">
                    {item.date}
                  </p>
                </td>
                <td className="p-4 py-5">
                  <select
                    className="rounded-sm bg-secondary px-2 text-primary hover:cursor-pointer"
                    id="status"
                    value={item.status}
                    onChange={(e) => {
                      updateBookingStatus(item.id!, e.target.value);
                      dispatch(fetchBookings());
                    }}
                  >
                    <option value="Beklemede">Beklemede</option>
                    <option value="Onaylandı">Onaylandı</option>
                    <option value="Reddedildi">Reddedildi</option>
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
          Toplam: {bookings.length}
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

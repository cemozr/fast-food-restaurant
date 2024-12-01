import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../states/store";
import { ReactNode, useState } from "react";

import ProductsDashboard from "./productsDashboard/ProductsDashboard";
import BookingsDashboard from "./BookingsDashboard";
import OrdersDashboard from "./OrdersDashBoard";
import Button from "../../../UI/Button";
import { signOut } from "firebase/auth";
import { auth } from "../../../../config/firebase";
import { setIsLoggedIn, setUser } from "../../../../states/authSlice";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const authStates = useSelector((state: RootState) => {
    return state.authReducer;
  });
  const [activeMenu, setActiveMenu] = useState<{
    name: string;
    component: ReactNode;
  }>({
    name: "handleOrders",
    component: <OrdersDashboard />,
  });

  const menus = [
    { name: "Ürünleri Yönet", component: <ProductsDashboard /> },
    { name: "Rezervasyonları Yönet", component: <BookingsDashboard /> },
    { name: "Siparişleri Yönet", component: <OrdersDashboard /> },
  ];
  return (
    <div className="flex w-full flex-grow flex-col items-center text-txtLight">
      <Button
        el="button"
        onClick={() => {
          signOut(auth).catch((error) => {
            console.error("Çıkış yaparken bir hata oluştu: ", error);
          });
          dispatch(setIsLoggedIn(false), setUser(null));
        }}
      >
        Çıkış Yap
      </Button>
      <ul className="flex flex-col gap-2 py-2 text-center text-txtLight">
        {menus.map((menu, i) => {
          return (
            <li key={i}>
              <span
                className="hover:cursor-pointer hover:text-secondary"
                onClick={() => setActiveMenu(menu)}
              >
                {menu.name}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="my-2 h-px w-1/2 bg-bg"></div>
      <div className="flex w-full flex-grow items-center justify-center bg-primary bg-opacity-70 lg:bg-opacity-0 lg:bg-none">
        {activeMenu.component}
      </div>
    </div>
  );
}

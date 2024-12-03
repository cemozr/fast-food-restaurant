import { useDispatch } from "react-redux";
import { ReactNode, useState } from "react";
import ProductsDashboard from "./productsDashboard/ProductsDashboard";
import BookingsDashboard from "./BookingsDashboard";
import OrdersDashboard from "./OrdersDashBoard";
import { signOut } from "firebase/auth";
import { auth } from "../../../../config/firebase";
import { setIsLoggedIn, setUser } from "../../../../states/authSlice";

export default function AdminDashboard() {
  const dispatch = useDispatch();

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
    <div className="flex flex-grow flex-col items-center text-txtLight">
      <ul className="my-4 flex flex-col gap-2 py-2 text-center text-lg font-semibold text-txtLight lg:flex-row lg:gap-6">
        <span
          className="order-2 hover:cursor-pointer hover:text-error"
          onClick={() => {
            signOut(auth).catch((error) => {
              console.error("Çıkış yaparken bir hata oluştu: ", error);
            });
            dispatch(setIsLoggedIn(false), setUser(null));
          }}
        >
          Çıkış Yap
        </span>
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
      <div className="h-px w-full bg-bg lg:w-full"></div>
      <div className="flex w-full flex-grow items-center justify-center bg-primary bg-opacity-70 lg:bg-opacity-0 lg:bg-none">
        {activeMenu.component}
      </div>
    </div>
  );
}

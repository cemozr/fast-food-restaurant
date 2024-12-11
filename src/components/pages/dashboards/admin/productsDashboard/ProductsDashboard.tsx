import { ReactNode, useState } from "react";
import AddProduct from "./AddProduct";
import ManageProducts from "./ManageProducts";
import { LuImport } from "react-icons/lu";
import { IoMdSettings } from "react-icons/io";
const menus = [
  { name: "Ekle", icon: <LuImport />, component: <AddProduct /> },
  {
    name: "Yönet",
    icon: <IoMdSettings />,
    component: <ManageProducts />,
  },
];

export default function ProductsDashboard() {
  const [activeMenu, setActiveMenu] = useState<{
    name: string;
    icon: ReactNode;
    component: ReactNode;
  }>({
    name: "handleOrders",
    icon: <LuImport />,
    component: <AddProduct />,
  });
  return (
    <div className="flex w-full flex-col items-center">
      <ul className="flex w-full py-4 text-center text-lg text-txtLight lg:w-2/3">
        {menus.map((menu, i) => {
          return (
            <li key={i} className="w-1/2">
              <span
                className="flex h-10 items-center justify-center gap-2 text-center font-semibold hover:animate-bounce hover:cursor-pointer hover:text-secondary"
                onClick={() => setActiveMenu(menu)}
              >
                {menu.name} {menu.icon}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="h-px w-full bg-bg"></div>
      <div className="flex w-full flex-grow items-center justify-center bg-opacity-0 bg-none lg:rounded-sm lg:bg-primary lg:bg-opacity-70">
        {activeMenu.component}
      </div>
    </div>
  );
}

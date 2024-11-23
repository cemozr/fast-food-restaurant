import { FaUser, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "./UI/Button";
import { setIsCartActive } from "../states/cartSlice";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";

type NavLinksProps = {
  isOpen?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const links: { to: string; value: string }[] = [
  { to: "/", value: "ANASAYFA" },
  { to: "/menu", value: "MENÜ" },
  { to: "/about", value: "HAKKIMIZDA" },
  { to: "/booking", value: "REZERVASYON" },
];

export default function NavLinks({ isOpen, setIsOpen }: NavLinksProps) {
  const dispatch = useDispatch();

  return (
    <div
      id="nav-links"
      className={`${!isOpen ? "hidden" : "flex"} flex-col items-center gap-5 py-5 lg:flex lg:w-full lg:flex-row lg:justify-around`}
    >
      <ul className="flex flex-col items-center justify-center gap-8 text-sm font-medium text-txtLight lg:flex-row">
        {links.map((link, i) => {
          return (
            <li key={i} className="hover:text-secondary">
              <Link onClick={() => setIsOpen(false)} to={link.to}>
                {link.value}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-center gap-4">
        <Button el="button-with-icon">
          <FaUser color="white" className="hover:fill-secondary" />
        </Button>
        <Button
          el="button-with-icon"
          onClick={() => {
            dispatch(setIsCartActive());
            setIsOpen(false);
          }}
        >
          <FaShoppingCart color="white" className="hover:fill-secondary" />
        </Button>
        <Button el="link" to="/menu">
          Online Sipariş
        </Button>
      </div>
    </div>
  );
}

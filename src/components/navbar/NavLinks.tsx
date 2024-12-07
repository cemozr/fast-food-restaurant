import { FaUser, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import { setIsCartActive } from "../../states/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../states/store";

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
  const isLoggedIn = useSelector(
    (state: RootState) => state.authReducer.isLoggedIn,
  );
  const user = useSelector((state: RootState) => state.authReducer.user);
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
      <div className="my-1 h-px w-1/2 bg-bg lg:hidden"></div>
      <div className="flex flex-wrap justify-center gap-4 lg:flex-none">
        <Button
          el="link-with-icon"
          to={isLoggedIn ? `/user/${user?.uid}` : "/auth"}
          onClick={() => setIsOpen(false)}
        >
          {isLoggedIn ? (
            <p className="text-txtLight underline">Hesabım</p>
          ) : (
            <FaUser color="white" className="hover:fill-secondary" />
          )}
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
        <Button el="link" to="/menu" onClick={() => setIsOpen(false)}>
          Online Sipariş
        </Button>
      </div>
    </div>
  );
}

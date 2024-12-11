import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import { setIsCartActive } from "../../states/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../states/store";
import CartIcon from "../UI/CartIcon";

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
  const { isLoggedIn, user, role } = useSelector(
    (state: RootState) => state.authReducer,
  );

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
        {isLoggedIn ? (
          <Button
            el="link-with-icon"
            to={`/${role}/${user?.uid}`}
            onClick={() => setIsOpen(false)}
          >
            <p className="text-txtLight underline">Hesabım</p>
          </Button>
        ) : (
          <Button
            el="link-with-icon"
            to="/auth"
            onClick={() => setIsOpen(false)}
          >
            <FaUser color="white" className="text-xl hover:fill-secondary" />
          </Button>
        )}

        <Button
          el="button-with-icon"
          onClick={() => {
            dispatch(setIsCartActive());
            setIsOpen(false);
          }}
        >
          <CartIcon />
        </Button>
        <Button el="link" to="/menu" onClick={() => setIsOpen(false)}>
          Online Sipariş
        </Button>
      </div>
    </div>
  );
}

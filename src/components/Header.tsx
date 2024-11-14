import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import Button from "./UI/Button";
export default function Header() {
  return (
    <div className="mx-48 flex items-center justify-around py-4">
      <span className="text-txtLight font-dancing text-3xl font-light">
        Feane
      </span>
      <ul className="text-txtLight flex gap-8 text-sm font-medium">
        <li className="hover:text-secondary">
          <Link to="/">ANASAYFA</Link>
        </li>
        <li className="hover:text-secondary">
          <Link to="/menu">MENÜ</Link>
        </li>
        <li className="hover:text-secondary">
          <Link to="/about">HAKKIMIZDA</Link>
        </li>
        <li className="hover:text-secondary">
          <Link to="/booking">REZERVASYON</Link>
        </li>
      </ul>
      <div className="flex gap-4">
        <button>
          <FaUser color="white" className="hover:fill-secondary" />
        </button>
        <button>
          <FaShoppingCart color="white" className="hover:fill-secondary" />
        </button>
        <Button el="link" to="/menu">
          Online Sipariş
        </Button>
      </div>
    </div>
  );
}

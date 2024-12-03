import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import NavLinks from "./NavLinks";

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="flex flex-col px-4 py-4 lg:mx-auto lg:flex-row">
      <div className="flex items-center justify-between">
        <span className="w-40 cursor-pointer font-dancing text-3xl font-light text-txtLight">
          Lezzet Lab
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl text-txtLight lg:hidden"
        >
          {isOpen ? <ImCross /> : <GiHamburgerMenu />}
        </button>
      </div>
      <NavLinks isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && <NavLinks setIsOpen={setIsOpen} />}
    </nav>
  );
}

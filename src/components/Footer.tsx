import { FaLocationDot } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="flex w-full flex-col gap-5 bg-primary px-10 py-4 text-center text-txtLight lg:bottom-0 lg:flex-row">
      <div className="flex flex-col items-center gap-2 lg:w-1/3">
        <h3 className="font-dancing text-3xl">İletişim</h3>
        <div className="flex">
          <FaLocationDot className="text-xl" />
          <p>Avrupa Yakası,Reşitpaşa, 34485 Sarıyer/İstanbul</p>
        </div>
        <div className="flex items-center gap-2">
          <IoIosCall className="text-xl" />
          <p className="flex">+90 534 999 66 66</p>
        </div>
        <div className="flex items-center gap-2">
          <IoIosMail className="text-xl" />
          <p>info@lezzetlab.com</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 lg:w-1/3">
        <h3 className="font-dancing text-4xl">Lezzet Lab</h3>
        <p>
          Lezzet Lab, tazelik ve yaratıcılıkla lezzeti buluşturur. Sizi her
          seferinde farklı bir deneyime davet ediyoruz. 🍕🍔🍝
        </p>
        <span className="flex justify-center gap-5">
          <FaFacebook className="text-2xl" />{" "}
          <FaSquareXTwitter className="text-2xl" />{" "}
          <FaInstagramSquare className="text-2xl" />
        </span>
      </div>
      <div className="flex flex-col items-center gap-2 lg:w-1/3">
        <h3 className="font-dancing text-3xl">Çalışma Saatlerimiz</h3>
        <p>Her gün</p>
        <p className="underline">10.00 - 22.00</p>
      </div>
    </div>
  );
}

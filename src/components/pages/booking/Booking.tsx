import { useState } from "react";
import BookingForm from "./BookingForm";
import Location from "./Location";
import SuccessAlert from "../../UI/SuccessAlert";

export default function Booking() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <div className="h-full w-full flex-grow bg-bg lg:flex lg:items-center lg:justify-around lg:px-32 lg:py-10">
      {isSubmitted && <SuccessAlert>Talep Oluşturuldu</SuccessAlert>}
      <BookingForm setIsSubmitted={setIsSubmitted} />
      <Location />
    </div>
  );
}

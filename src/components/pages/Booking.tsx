import BookingForm from "../BookingForm";
import Location from "../Location";

export default function Booking() {
  return (
    <div className="h-full w-full bg-bg lg:flex lg:items-center lg:justify-around lg:px-32 lg:py-10">
      <BookingForm />
      <Location />
    </div>
  );
}

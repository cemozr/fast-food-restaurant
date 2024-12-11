import { LiaHamburgerSolid } from "react-icons/lia";

export default function Loading() {
  return (
    <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-primary p-5 text-center text-4xl text-txtLight">
      <div className="animate-spin">
        <LiaHamburgerSolid />
      </div>
    </div>
  );
}

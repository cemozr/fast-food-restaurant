import { ReactNode } from "react";

type SuccessAlertProps = {
  children: ReactNode;
};

export default function SuccessAlert({ children }: SuccessAlertProps) {
  return (
    <div className="bg-success w-full py-2 text-txtLight lg:absolute lg:top-24">
      <h2 className="ml-4 text-xl font-bold lg:ml-8">{children}</h2>
    </div>
  );
}

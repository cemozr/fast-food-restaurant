import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  el: "button";
} & ComponentPropsWithoutRef<"button">;

type LinkButtonProps = {
  el: "link";
  children: ReactNode;
  to: string;
};

export default function Button(props: ButtonProps | LinkButtonProps) {
  if (props.el === "link") {
    return (
      <Link
        className="bg-secondary text-txtLight hover:bg-secondaryDark rounded-full px-7 py-2"
        to={props.to}
      >
        {props.children}
      </Link>
    );
  }
  return <button {...props}></button>;
}

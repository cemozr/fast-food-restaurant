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
type ButtonCategoryProps = {
  el: "button-category";
} & ComponentPropsWithoutRef<"button">;

export default function Button(
  props: ButtonProps | LinkButtonProps | ButtonCategoryProps,
) {
  if (props.el === "link") {
    return (
      <Link
        className="w-40 rounded-full bg-secondary px-7 py-2 text-txtLight hover:bg-secondaryDark"
        to={props.to}
      >
        {props.children}
      </Link>
    );
  }
  if (props.el === "button-category") {
    return (
      <button
        {...props}
        className="rounded-full bg-bg px-6 py-1 text-lg text-txtDark focus:bg-primary focus:text-txtLight"
      ></button>
    );
  }
  return <button {...props}></button>;
}

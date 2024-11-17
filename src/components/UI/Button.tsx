import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";

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

type ButtonAddCartProps = {
  el: "button-add-cart";
} & ComponentPropsWithoutRef<"button">;

export default function Button(
  props:
    | ButtonProps
    | LinkButtonProps
    | ButtonCategoryProps
    | ButtonAddCartProps,
) {
  if (props.el === "link") {
    return (
      <Link
        className="w-40 rounded-full bg-secondary px-7 py-2 font-semibold text-txtLight hover:bg-secondaryDark"
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
        className="rounded-full bg-bg px-4 py-1 text-center text-lg text-txtDark focus:bg-primary focus:text-txtLight"
      ></button>
    );
  }
  if (props.el === "button-add-cart") {
    return (
      <button
        className="rounded-full bg-secondary p-3 hover:bg-secondaryDark"
        {...props}
      >
        <FaCartShopping className="text-lg" />
      </button>
    );
  }
  return (
    <button
      className="w-40 rounded-full bg-secondary px-7 py-2 font-semibold text-txtLight hover:bg-secondaryDark"
      {...props}
    ></button>
  );
}

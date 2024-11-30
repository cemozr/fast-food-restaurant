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
} & ComponentPropsWithoutRef<"button">;
type ButtonCategoryProps = {
  el: "button-category";
} & ComponentPropsWithoutRef<"button">;

type ButtonAddCartProps = {
  el: "button-add-cart";
} & ComponentPropsWithoutRef<"button">;
type ButtonWithIconProps = {
  el: "button-with-icon";
} & ComponentPropsWithoutRef<"button">;
type LinkWithIconProps = {
  el: "link-with-icon";
  to: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">;

export default function Button(
  props:
    | ButtonProps
    | LinkButtonProps
    | ButtonCategoryProps
    | ButtonAddCartProps
    | ButtonWithIconProps
    | LinkWithIconProps,
) {
  if (props.el === "link") {
    return (
      <button {...props}>
        <Link
          className="w-40 rounded-full bg-secondary px-7 py-2 font-semibold text-txtLight hover:bg-secondaryDark"
          to={props.to}
        >
          {props.children}
        </Link>
      </button>
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
  if (props.el === "button-with-icon") {
    return <button {...props}></button>;
  }
  if (props.el === "link-with-icon") {
    return (
      <button {...props} className="flex items-center">
        <Link to={props.to}>{props.children}</Link>
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

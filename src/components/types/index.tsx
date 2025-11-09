import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "../variants/css/button";
import { LinkProps } from "next/link";

export type TButton = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export type TLinks = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps &
  VariantProps<typeof buttonVariants>;

export type THoverPosition = {
  top: number;
  left: number;
  width: number;
  height: number;
  opacity: number;
};

export type THoverEvent =
  | React.MouseEvent<HTMLElement, MouseEvent>
  | React.FocusEvent<HTMLElement, Element>;

import { cn } from "@/lib/utils";
import { TButton, TLinks } from "../types";
import { buttonVariants } from "../variants/css/button";
import Link from "next/link";

export const Button = ({ className, variant, size, ...props }: TButton) => (
  <button
    type="button"
    className={cn(buttonVariants({ variant, size }), className)}
    {...props}
  />
);

export const Links = ({ href, className, variant, size, ...props }: TLinks) => (
  <Link
    href={href}
    className={cn(buttonVariants({ variant, size }), className)}
    {...props}
  />
);

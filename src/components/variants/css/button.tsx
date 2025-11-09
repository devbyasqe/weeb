import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full font-mono",
    "text-sm font-medium whitespace-nowrap",
    "transition-all duration-300",
    "active:scale-95",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "focus-visible:ring-gray-border focus-visible:ring-offset-gray-accent focus-visible:ring-1 focus-visible:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-inverted-bg text-inverted-foreground",
          "hover:bg-inverted-bg/75 backdrop-blur",
          "focus-visible:ring-inverted-bg",
        ],
        primary: [
          "bg-violet-background text-absolute-white",
          "hover:bg-violet-background/90 backdrop-blur",
          "focus-visible:ring-violet-background",
        ],
        muted: [
          "text-gray-foreground bg-gray-muted",
          "hover:bg-violet-muted hover:text-violet-foreground",
          "focus-visible:text-violet-foreground focus-visible:bg-violet-muted focus-visible:ring-violet-border",
        ],
        outline: [
          "bg-gray-accent text-gray-foreground shadow-gray-border border",
          "hover:bg-gray-muted",
          "not-active:hover:shadow",
          "focus-visible:bg-gray-muted",
        ],
        link: [
          "text-gray-foreground underline-offset-3",
          "hover:text-violet-foreground hover:underline",
          "focus-visible:text-violet-foreground focus-visible:underline",
        ],
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

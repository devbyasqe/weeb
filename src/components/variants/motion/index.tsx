import { Variants } from "motion";

export const navbarHeaderVariant: Variants = {
  hidden: {
    y: "-150%",
  },
  visible: {
    y: 0,
  },
};

export const mobileNavbarVariant: Variants = {
  hidden: {
    x: "100%",
  },
  visible: {
    x: 0,
  },
};

export const scaleVariant: Variants = {
  initial: { scale: 1.1, opacity: 0.3, filter: "blur(10px)" },
  animate: { scale: 1, opacity: 1, filter: "blur(0px)" },
  exit: { scale: 1.2, opacity: 0.3, filter: "blur(10px)" },
};

export const bannerContentVariant: Variants = {
  initial: (custom: string) => ({
    x: custom === "right" ? "-50%" : "50%",
    opacity: 0.3,
    filter: "blur(10px)",
  }),
  animate: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: (custom: string) => ({
    x: custom === "right" ? "50%" : "-50%",
    opacity: 0.3,
    filter: "blur(10px)",
  }),
};

export const cardVariant: Variants = {
  initial: { y: 100, opacity: 0.3, filter: "blur(30px)", scale: 0.8 },
  visible: { y: 0, opacity: 1, filter: "blur(0px)", scale: 1 },
};

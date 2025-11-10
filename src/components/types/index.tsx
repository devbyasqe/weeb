import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "../variants/css/button";
import { LinkProps } from "next/link";
import { ReactElement } from "react";

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

export type TChildren = { children: React.ReactNode };

export type TIdParams = { params: Promise<{ id: string }> };

export type THeroBannerCard = {
  id: number;
  imageSrc: string | null;
  rank: number;
  title: string;
  description: string;
  score: string;
  genres: {
    label: string;
    link: string;
  }[];
  detailsLink: string;
  trailerUrl: string | null;
  date: string;
};

export type TMediaOverViewStatsCard = {
  imgSrc?: string | null;
  overViewStats: {
    title: string;
    text?: string | number | null;
  }[];
};

export type TMediaOverViewInfoCard = {
  infoStats: {
    title: string;
    text?: string | null;
    links?: {
      label: string;
      link: string;
    }[];
  }[];
};

export type TItemCard = {
  link: string;
  imgSrc?: string | null;
  title: string;
  color?: "gray" | "violet";
  left?: {
    color?: "red" | "yellow";
    icon: ReactElement;
    text: number | string;
  };
  right?: {
    icon?: ReactElement;
    text: number | string;
  };
  blur?: boolean;
};

import { TItemCard } from "@/components/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { cardVariant } from "../variants/motion";

export const ItemCard = ({
  imgSrc,
  link,
  title,
  left,
  right,
  blur = true,
  color = "gray",
}: TItemCard) => (
  <motion.div
    variants={cardVariant}
    initial="initial"
    whileInView="visible"
    transition={{ duration: 0.3 }}
    viewport={{ once: true }}
    className="isolate flex items-center justify-center overflow-clip rounded-lg"
  >
    <Link
      href={link}
      className={cn(
        "group/item-card relative block size-full shrink-0 overflow-clip rounded-lg transition-all duration-300",
        "hover:size-[97%] hover:ring-1 hover:ring-offset-2",
        "focus-visible:size-[97%] focus-visible:ring-1 focus-visible:ring-offset-2",
        "ring-inverted-bg/50 ring-offset-gray-muted",
        color === "violet" && "ring-violet-border ring-offset-violet-muted",
        blur &&
          "not-focus-visible:group-hover/item-cards:not-hover:blur-2xs not-focus-visible:group-hover/item-cards:not-hover:grayscale-50",
      )}
    >
      {left && (
        <div
          className={cn(
            "absolute top-1 left-1 z-50 inline-flex h-7 items-center gap-1 rounded-lg px-2",
            "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            "bg-yellow text-absolute-black",
            left.color === "red" && "bg-red text-absolute-white",
          )}
        >
          {left.icon}
          <p className="text-xs font-medium">{left.text}</p>
        </div>
      )}

      {right && (
        <div
          className={cn(
            "absolute top-1 right-1 z-50 inline-flex h-7 items-center gap-1 rounded-lg px-2",
            "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            "bg-gray-muted text-gray-foreground",
            color === "violet" && "text-violet-foreground bg-violet-muted",
          )}
        >
          {right.icon}
          <p className="text-xs font-medium">{right.text} </p>
        </div>
      )}

      <div className="aspect-image relative overflow-clip rounded-lg">
        {imgSrc && (
          <Image
            height={480}
            width={640}
            loading="lazy"
            src={imgSrc}
            alt={`${title} thumbnail image`}
            className={cn(
              "size-full object-cover object-center transition-all duration-300",
              "group-hover/item-card:scale-125 group-focus-visible/item-card:scale-125",
            )}
          />
        )}
        <div
          className={cn(
            "absolute inset-0 rounded-lg mask-t-to-75%",
            "bg-absolute-black",
            color === "violet" && "bg-violet-muted mask-t-to-50%",
          )}
        />
      </div>
      <div
        className={cn(
          "relative -mt-5 flex h-8 w-full items-center justify-center rounded-lg border px-4",
          "bg-gray-muted text-gray-foreground",
          color === "violet" &&
            "text-violet-foreground bg-violet-muted border-violet-border",
        )}
      >
        <p className="line-clamp-1 text-center font-mono text-sm font-medium">
          {title}
        </p>
      </div>
    </Link>
  </motion.div>
);

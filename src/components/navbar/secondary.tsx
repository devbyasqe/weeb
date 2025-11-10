"use client";
import { usePathname } from "next/navigation";
import { useHoverHighlightPosition } from "../hooks/mouse-position";
import { THoverEvent } from "../types";
import { Links } from "../ui/button";
import { motion } from "motion/react";

export const SecondaryNavbar = ({
  navLinks,
}: {
  navLinks: { label: string; slug: string }[];
}) => {
  const pathname = usePathname();

  const { handleMouseEnter, handleMouseLeave, hoverPosition } =
    useHoverHighlightPosition();

  const handleHover = (e: THoverEvent, slug: string) => {
    if (slug !== pathname) {
      handleMouseEnter(e);
    }
  };

  return (
    <>
      <div className="bg-gray-muted flex justify-center overflow-clip px-1 py-4">
        <motion.div
          onMouseLeave={handleMouseLeave}
          className="bg-gray-accent relative flex snap-x items-center gap-2 overflow-x-auto rounded-full border p-1"
        >
          {navLinks.map(({ label, slug }, index) => {
            return (
              <Links
                key={`${label}-${index}`}
                href={slug}
                variant={slug === pathname ? "primary" : null}
                className="z-10 snap-center"
                onMouseEnter={(e) => handleHover(e, slug)}
                onFocus={(e) => handleHover(e, slug)}
              >
                {label}
              </Links>
            );
          })}

          <motion.div
            animate={{ ...hoverPosition }}
            className="bg-gray-muted absolute rounded-full"
          />
        </motion.div>
      </div>
    </>
  );
};

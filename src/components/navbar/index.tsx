"use client";

import React, { useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { usePathname } from "next/navigation";
import { mobileNavbarVariant, navbarHeaderVariant } from "../variants/motion";
import Link from "next/link";
import { LogoIcon } from "../svg/logo";
import { Button, Links } from "../ui/button";
import { MenuIcon, SearchIcon, XIcon } from "../svg";
import { cn } from "@/lib/utils";
import { useNavbarStore } from "../store/navbar";

const NAV_LINKS = [
  { label: "Anime", link: "/" },
  { label: "Manga", link: "/manga" },
  { label: "Characters", link: "/characters" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const {
    isNavBarHidden,
    hideNavbar,
    showNavbar,
    isMobileNavOpened,
    toggleMobileNavbarVisibility,
    setIsScrolled,
    isScrolled,
  } = useNavbarStore();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (latest > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    if (!isMobileNavOpened) {
      if (previous && latest > 250 && latest > previous) {
        hideNavbar();
      } else {
        showNavbar();
      }
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileNavOpened) {
        toggleMobileNavbarVisibility();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileNavOpened]);

  return (
    <>
      <motion.header
        variants={navbarHeaderVariant}
        animate={isNavBarHidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "linear" }}
        className={cn(
          "fixed inset-x-0 top-1 z-50 mx-auto w-[95%] max-w-7xl transition-all duration-300 sm:max-md:max-w-160",
          isScrolled && "top-4",
        )}
      >
        <div
          className={cn(
            "mx-auto flex h-14 w-full items-center justify-between rounded-none px-2 transition-all duration-300 md:px-4",
            isScrolled &&
              "bg-gray-muted/50 top-3 w-[95%] rounded-full border px-4 backdrop-blur md:px-6",
          )}
        >
          <Link
            href={"/"}
            className="inline-flex h-8 items-center justify-center py-1"
          >
            <LogoIcon className="fill-violet-foreground size-full" />
          </Link>
          <DeskTopNav pathname={pathname} />

          <div className="inline-flex gap-2">
            <Links href={"/search"} variant={"outline"} size={"icon"}>
              <SearchIcon />
            </Links>
            <Button
              variant={"outline"}
              size={"icon"}
              className="md:hidden"
              onClick={toggleMobileNavbarVisibility}
            >
              {isMobileNavOpened ? <XIcon /> : <MenuIcon />}
            </Button>
          </div>
        </div>
      </motion.header>
      <MobileNav pathname={pathname} />
    </>
  );
};

export const DeskTopNav = ({
  pathname,
  className,
}: {
  pathname: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative hidden items-center justify-center gap-0.5 rounded-full p-1 md:flex",
        className,
      )}
    >
      {NAV_LINKS.map(({ label, link }) => (
        <Links
          key={label}
          size={"sm"}
          href={link}
          variant={null}
          className={cn(
            "hover:text-violet-foreground focus-visible:text-violet-foreground text-base",
            pathname === link &&
              "text-violet-foreground focus-visible:text-violet-foreground pointer-events-none underline underline-offset-2",
          )}
        >
          {label}
        </Links>
      ))}
    </div>
  );
};

export const MobileNav = ({ pathname }: { pathname: string }) => {
  const { isMobileNavOpened, toggleMobileNavbarVisibility } = useNavbarStore();

  return (
    <AnimatePresence>
      {isMobileNavOpened && (
        <div className="bg-gray-background/60 fixed inset-0 z-50 mx-auto w-[95%] max-w-7xl overflow-clip py-1 backdrop-blur transition-all duration-300 sm:max-md:max-w-160">
          <motion.div
            variants={mobileNavbarVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3, ease: "linear" }}
            className="bg-gray-background ms-auto size-full max-w-sm overflow-y-auto rounded-xl border"
          >
            <div className="bg-gray-background sticky top-0 flex h-16 items-center justify-between border-b px-4 transition-all duration-300">
              <Link
                href={"/"}
                className="inline-flex h-8 items-center justify-center py-1"
                onClick={(e) => {
                  if (pathname === "/") {
                    e.preventDefault();
                  }
                  toggleMobileNavbarVisibility();
                }}
              >
                <LogoIcon className="fill-violet-foreground size-full" />
              </Link>
              <Button
                size={"icon"}
                variant={"outline"}
                className="md:hidden"
                onClick={toggleMobileNavbarVisibility}
              >
                {isMobileNavOpened ? <XIcon /> : <MenuIcon />}
              </Button>
            </div>
            <nav className="items-cente flex flex-col gap-y-10 place-self-center px-4 py-20">
              {NAV_LINKS.map(({ label, link }) => (
                <Link
                  key={label}
                  href={link}
                  className={cn(
                    "hover:text-violet-foreground focus-visible:text-violet-foreground inline-flex items-center text-5xl font-bold transition-all duration-300",
                    pathname === link &&
                      "text-violet-foreground pointer-events-none underline underline-offset-8",
                  )}
                  onClick={(e) => {
                    if (pathname === link) {
                      e.preventDefault();
                    }
                    toggleMobileNavbarVisibility();
                  }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

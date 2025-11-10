"use client";

import React from "react";
import { THeroBannerCard } from "../../types";
import useCarousel from "../../hooks/carousel";
import { AnimatePresence, motion } from "motion/react";
import { bannerContentVariant, scaleVariant } from "../../variants/motion";
import Image from "next/image";
import { Button, Links } from "../../ui/button";
import {
  CalendarIcon,
  ChevronRightIcon,
  PlayIcon,
  StarICon,
  XIcon,
} from "../../svg";
import { CAROUSEL_INTERVAL, cn } from "@/lib/utils";

export const HeroBannerCard = ({ list }: { list: THeroBannerCard[] }) => {
  const {
    item,
    togglePause,
    prev,
    next,
    selected,
    paused,
    direction,
    changeSelected,
  } = useCarousel({
    data: list,
  });
  return (
    <>
      <section>
        <div className="isolate px-2 pt-24 pb-10 transition-all duration-300 md:px-4">
          <div className="grid md:grid-cols-2 md:gap-x-2 md:gap-y-6">
            <div className="grid h-dvh max-h-130 min-h-96 overflow-clip rounded-lg border md:order-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`banner-image-${item.id}`}
                  className="size-full"
                  variants={scaleVariant}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "linear" }}
                >
                  {item.imageSrc && (
                    <Image
                      height={1080}
                      width={1920}
                      priority
                      src={item.imageSrc}
                      alt={`${item.title} image`}
                      className="size-full object-cover object-center"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative z-50 me-1.5 flex items-center justify-end max-md:-mt-34 md:order-3 md:col-span-full md:me-0 md:justify-center">
              <div className="bg-gray-background rounded-xl border p-1">
                <div className="inline-flex items-center gap-1 md:hidden">
                  <Button variant={"outline"} size={"icon"} onClick={prev}>
                    <ChevronRightIcon className="-rotate-180" />
                  </Button>
                  <Button variant={"outline"} size={"icon"} onClick={next}>
                    <ChevronRightIcon />
                  </Button>
                </div>

                <div className="hidden items-center gap-2 md:flex">
                  {Array.from({ length: list.length }).map((_, index) => (
                    <button
                      key={`benner-slider-${index}`}
                      disabled={selected === index}
                      onClick={() => changeSelected(index)}
                      className={cn(
                        "bg-gray-muted relative h-2 w-6 cursor-pointer overflow-clip rounded-full border transition-all duration-300",
                        "disabled:pointer-events-none",
                        "hover:bg-gray-border hover:border",
                        "focus-visible:bg-gray-border focus-visible:border",
                        selected === index &&
                          !paused &&
                          "bg-gray-foreground-muted w-12 scale-105",
                      )}
                    >
                      <AnimatePresence>
                        {selected === index && !paused && (
                          <motion.span
                            layout
                            className="bg-gray-foreground absolute top-0 left-0 h-full"
                            initial={{
                              width: 0,
                            }}
                            animate={{
                              width: "100%",
                            }}
                            transition={{
                              duration: CAROUSEL_INTERVAL / 1000,
                              ease: "linear",
                            }}
                          />
                        )}
                      </AnimatePresence>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="animate-spin-gradient relative flex items-center overflow-clip rounded-lg border border-transparent bg-[linear-gradient(to_top_right,hsl(var(--gray-muted)),hsl(var(--gray-accent))),conic-gradient(from_var(--angle),hsl(var(--gray-border)),hsl(var(--yellow)),hsl(var(--red)),hsl(var(--gray-border))_5%)] [background-clip:padding-box,border-box] [background-origin:padding-box,border-box] px-4 py-6 max-md:-mt-24 md:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`banner-content-${item.id}`}
                  custom={direction}
                  variants={bannerContentVariant}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "linear" }}
                >
                  <p className="text-violet-foreground text-lg font-bold">
                    #{item.rank} Rank
                  </p>
                  <h2 className="mt-1 line-clamp-1 md:line-clamp-2">
                    {item.title}
                  </h2>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="inline-flex items-center gap-1 whitespace-nowrap">
                      <StarICon className="fill-yellow size-4" />
                      <p>{item.score}</p>
                    </div>
                    <div className="inline-flex items-center gap-1 whitespace-nowrap">
                      <CalendarIcon className="fill-red size-4" />
                      <p>{item.date} </p>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center gap-3">
                    {item.genres.map(({ label, link }, index) => (
                      <Links
                        key={label + index}
                        href={link}
                        variant={"link"}
                        size={null}
                      >
                        {label}
                        {index < item.genres.length - 1 && ","}
                      </Links>
                    ))}
                  </div>
                  <p className="text-gray-foreground-muted mt-3 line-clamp-3">
                    {item.description}
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    {item.trailerUrl && (
                      <Button variant={"primary"} onClick={togglePause}>
                        <PlayIcon /> Watch Trailer
                      </Button>
                    )}
                    <Links href={item.detailsLink}>
                      Details <ChevronRightIcon />
                    </Links>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {item.trailerUrl && paused && (
          <div className="bg-gray-background fixed inset-0 z-50 mx-auto flex w-[95%] max-w-7xl items-center justify-center overflow-clip p-2 transition-all duration-300 sm:max-md:max-w-160 md:p-4">
            <motion.div
              variants={scaleVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "linear" }}
              className="relative aspect-video w-full shrink-0"
            >
              <Button
                variant={"primary"}
                className="absolute top-0 left-1/2 z-50 -translate-x-1/2 max-md:-top-12"
                onClick={togglePause}
              >
                <XIcon /> Close
              </Button>
              <iframe
                src={item.trailerUrl}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="size-full shrink-0 rounded-lg border"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

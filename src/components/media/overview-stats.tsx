"use client";
import React, { useEffect } from "react";
import { TChildren } from "../types";
import { useMediaOverviewStore } from "../store/media/overview";
import { cn } from "@/lib/utils";
import { SecondaryNavbar } from "../navbar/secondary";
import { MediaOverViewStatsCard } from "../cards/media/overview";
import { MediaOverViewStatsLoader } from "../ui/loader";

export const MediaOverViewStats = ({
  children,
  id,
  category,
}: TChildren & { id: string; category: "anime" | "manga" }) => {
  const { isError, overviewData, fetchMediaOverview } = useMediaOverviewStore();
  const key = `${category}-${id}`;
  const data = overviewData[key];

  useEffect(() => {
    if (!data) {
      fetchMediaOverview(key);
    }
  }, []);

  if (!data || isError)
    return (
      <MediaOverViewStatsLoader isError={!!isError}>
        {children}
      </MediaOverViewStatsLoader>
    );

  const basePath = category === "anime" ? `/${id}` : `/manga/${id}`;

  const navLinks = [
    { label: "Overview", slug: basePath },
    { label: "Characters", slug: `${basePath}/characters` },
    { label: "Staffs", slug: `${basePath}/staffs` },
  ];

  if (category === "anime" && data.episodes) {
    navLinks.push({ label: "Episodes", slug: `/${id}/episodes` });
  }
  return (
    <>
      <div className="space-y-2 px-2 pt-24 pb-10 transition-all duration-300 md:space-y-4 md:px-4">
        <div
          className={cn(
            "inline-flex h-8 items-center gap-2 rounded-full border px-3 font-semibold",
            data.header.airing
              ? "bg-green/30 border-green"
              : "bg-red/30 border-red",
          )}
        >
          <div
            className={cn(
              "size-3 rounded-full",
              data.header.airing ? "bg-green" : "bg-red",
            )}
          >
            <div
              className={cn(
                "size-full animate-ping rounded-full",
                data.header.airing ? "bg-green" : "bg-red",
              )}
            />
          </div>
          {data.header.airing ? "Ongoing" : "Finished"}
        </div>
        <h1 className="font-mono text-balance">{data.header.title} </h1>
      </div>
      <SecondaryNavbar navLinks={navLinks} />
      <section className="flex gap-2 px-2 py-10 transition-all duration-300 max-md:flex-col md:gap-4 md:px-4">
        <div className="transition-all duration-300 md:w-4/12 lg:w-3/12">
          <div className="sticky top-14 space-y-2 transition-all duration-300 md:space-y-4">
            <MediaOverViewStatsCard {...data.stats} />
          </div>
        </div>
        <div className="space-y-2 transition-all duration-300 md:w-8/12 md:space-y-4 lg:w-9/12">
          {children}
        </div>
      </section>
    </>
  );
};

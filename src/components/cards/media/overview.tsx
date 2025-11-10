"use client";

import Image from "next/image";
import { TMediaOverViewInfoCard, TMediaOverViewStatsCard } from "../../types";
import { cn } from "@/lib/utils";
import { Button, Links } from "@/components/ui/button";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRightIcon } from "@/components/svg";
import { TRelation } from "@/components/types/common";

export const MediaOverViewStatsCard = ({
  imgSrc,
  overViewStats,
}: TMediaOverViewStatsCard) => (
  <>
    <div className="bg-gray-accent aspect-image overflow-clip rounded-lg border">
      {imgSrc && (
        <Image
          height={720}
          width={1080}
          priority
          src={imgSrc}
          alt="thumbnail image"
          className="size-full object-cover object-center"
        />
      )}
    </div>
    <div className="p-1">
      <div className="ring-offset-gray-accent ring-gray-border grid grid-cols-2 gap-1 overflow-clip rounded-lg ring-1 ring-offset-4">
        {overViewStats.map(({ title, text }, index) => (
          <div
            key={title + index}
            className={cn(
              "bg-gray-muted px-4 py-2",
              overViewStats.length % 2 !== 0 &&
                index === overViewStats.length - 1 &&
                "col-span-full text-center",
            )}
          >
            <p className="text-gray-foreground-muted font-medium">{title}</p>
            {text && <p className="mt-2 text-lg font-semibold">{text}</p>}
          </div>
        ))}
      </div>
    </div>
  </>
);

export const MediaOverViewInfoCard = ({
  infoStats,
}: TMediaOverViewInfoCard) => (
  <div className="bg-gray-accent rounded-lg border">
    <h3 className="px-3 py-4">Infos</h3>
    <div className={cn("grid gap-1 p-1 lg:grid-cols-2")}>
      {infoStats.map(({ title, text, links }, index) => (
        <div
          key={title + index}
          className={"bg-gray-background rounded-md border px-4 py-2"}
        >
          <p className="text-gray-foreground-muted font-medium">{title}</p>
          {text && <p className="mt-2 font-semibold">{text}</p>}

          {links && (
            <div className="mt-3 inline-flex flex-wrap items-center gap-x-2 gap-y-1">
              {links.map(({ link, label }, index) => (
                <Links
                  key={link + index}
                  href={link}
                  variant={"link"}
                  size={null}
                  className="text-base"
                >
                  {label}
                  {index < links.length - 1 && ","}
                </Links>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export const MediaExpandableCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  if (!description) return null;

  const words = description.trim().split(/\s+/);
  const hasMore = words.length > 40;
  const shortDescription = words.slice(0, 40).join(" ") + "...";

  return (
    <div className="bg-gray-accent space-y-3 rounded-lg border px-3 py-4">
      <h3>{title}</h3>

      <AnimatePresence mode="wait">
        {hasMore && (
          <motion.div
            layout
            transition={{
              duration: 0.5,
              ease: "linear",
            }}
            className="overflow-hidden"
          >
            {!expanded && <motion.p layout>{shortDescription}</motion.p>}
            {expanded && <motion.p layout>{description}</motion.p>}
          </motion.div>
        )}
      </AnimatePresence>

      {!hasMore && <p> {description} </p>}

      {hasMore && (
        <Button
          variant={"link"}
          size={null}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Read less" : "Read more"}
          <ChevronRightIcon
            className={cn(
              "transition-all duration-300",
              !expanded ? "rotate-90" : "rotate-270",
            )}
          />
        </Button>
      )}
    </div>
  );
};

export const MediaRelationcard = ({
  relations,
}: {
  relations: TRelation[];
}) => (
  <div className="bg-gray-accent rounded-xl border p-1">
    <h3 className="px-3 py-4">Relations</h3>
    <div className="gap-2 space-y-2 lg:columns-2">
      {relations.map(({ entry, relation }) => (
        <div
          key={relation}
          className="bg-gray-background break-inside-avoid rounded-lg border px-4 py-2"
        >
          <p className="text-gray-foreground-muted font-medium">{relation}</p>
          <div className="mt-4 flex flex-col gap-2">
            {entry.map(({ mal_id, name, type }, index) => (
              <Links
                href={type === "anime" ? `/${mal_id}` : `/manga/${mal_id}`}
                variant={"link"}
                key={mal_id}
                size={null}
                className="line-clamp-1 text-base whitespace-pre-wrap"
              >
                <span className="text-gray-foreground-muted me-2">
                  {index + 1}.
                </span>
                <span>
                  {name}
                  {index < entry.length - 1 && ","}
                </span>
              </Links>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

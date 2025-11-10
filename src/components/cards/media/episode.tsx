"use client";
import React from "react";
import { motion } from "motion/react";
import { cn, formatDateString } from "@/lib/utils";
import { cardVariant } from "@/components/variants/motion";
import { TAnimeEpisode } from "@/components/types/anime";

export const EpisodeCard = ({episode}:{episode:TAnimeEpisode}) => {
  return (
    <motion.div
      key={episode.mal_id}
      className="sticky top-14 isolate"
      variants={cardVariant}
      initial="initial"
      whileInView="visible"
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
    >
      {episode.filler && (
        <p className="bg-red relative z-50 inline-flex rounded-full px-1.5 py-1 text-xs font-medium">
          Fillers
        </p>
      )}

      <div
        className={cn(
          "bg-gray-accent space-y-4 rounded-lg border p-3",
          episode.filler && "border-red/50 -mt-3 pt-4",
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-violet-foreground text-sm font-medium">
            Episode {episode.mal_id}
          </p>
          <p className="text-gray-foreground-muted text-sm font-medium">
            {formatDateString(episode.aired)}
          </p>
        </div>
        <p className="font-mono">{episode.title} </p>
      </div>
    </motion.div>
  );
};

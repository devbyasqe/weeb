"use client";
import React from "react";
import { useMediaOverviewStore } from "../store/media/overview";
import { MediaOverviewInfosLoader } from "../ui/loader";
import {
  MediaExpandableCard,
  MediaOverViewInfoCard,
  MediaRelationcard,
} from "../cards/media/overview";
import { cardVariant } from "../variants/motion";
import { motion } from "motion/react";

export const MediaOverViewInfos = ({ id }: { id: string }) => {
  const { overviewData, isError } = useMediaOverviewStore();
  const data = overviewData[id];
  if (!data || isError) return <MediaOverviewInfosLoader isError={!!isError} />;
  return (
    <>
      <MediaOverViewInfoCard infoStats={data.overview.infos.infoStats} />
      {data.overview.descriptions.length > 0 &&
        data.overview.descriptions.map(({ description, title }) => (
          <MediaExpandableCard
            key={title}
            title={title}
            description={description}
          />
        ))}
      {data.overview.relations.length > 0 && (
        <MediaRelationcard relations={data.overview.relations} />
      )}

      {data.overview.trailerUrl && (
        <motion.div
          variants={cardVariant}
          initial="initial"
          whileInView="visible"
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="bg-gray-accent rounded-lg border p-1"
        >
          <iframe
            loading="lazy"
            src={`${data.overview.trailerUrl.replace(
              "autoplay=1",
              "autoplay=0",
            )}`}
            title={data.header.title}
            allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full shrink-0 rounded-md max-md:h-80 md:aspect-video"
          />
        </motion.div>
      )}
    </>
  );
};

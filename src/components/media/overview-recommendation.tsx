"use client";

import React, { useEffect } from "react";
import { useOverviewRecmStore } from "../store/media/overviewRecm";
import { CardRecommendationsLoader } from "../ui/loader";
import { ItemCard } from "../cards/item";

export const MediaOverViewRecommendation = ({
  category,
  id,
}: {
  category: "anime" | "manga";
  id: string;
}) => {
  const key = `${category}-${id}`;

  const { isError, fetchOverviewRecm, overviewRecm } = useOverviewRecmStore();

  const data = overviewRecm[key];
  useEffect(() => {
    if (!data) {
      fetchOverviewRecm(key);
    }
  }, []);

  if (!data || isError)
    return <CardRecommendationsLoader isError={!!isError} />;

  if (data.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="t3 px-2 py-10 md:px-4">
        <h2 className="">You May Also Like </h2>
        <div className="group/item-cards mt-6 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map(({ entry }) => (
            <ItemCard
              key={entry.mal_id}
              title={entry.title}
              link={
                category === "anime"
                  ? `/${entry.mal_id}`
                  : `/manga/${entry.mal_id}`
              }
              imgSrc={
                entry.images.webp.large_image_url ||
                entry.images.jpg.large_image_url
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

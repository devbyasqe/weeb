import { MediaOverViewRecommendation } from "@/components/media/overview-recommendation";
import { MediaOverViewStats } from "@/components/media/overview-stats";
import { TChildren, TIdParams } from "@/components/types";
import React from "react";

const AnimeDetailsLayout = async ({
  children,
  params,
}: TChildren & TIdParams) => {
  const { id } = await params;
  return (
    <>
      <MediaOverViewStats id={id} category="anime">
        {children}
      </MediaOverViewStats>
      <MediaOverViewRecommendation category="anime" id={id} />
    </>
  );
};

export default AnimeDetailsLayout;

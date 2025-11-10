import { MediaOverViewStats } from "@/components/media/overview-stats";
import { TChildren, TIdParams } from "@/components/types";
import React from "react";

const MangaDetailsLayout = async ({
  children,
  params,
}: TChildren & TIdParams) => {
  const { id } = await params;
  return (
    <>
      <MediaOverViewStats id={id} category="manga">
        {children}
      </MediaOverViewStats>
    </>
  );
};

export default MangaDetailsLayout;

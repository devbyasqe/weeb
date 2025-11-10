"use client";
import { MediaOverViewInfos } from "@/components/media/overview-info";
import { TIdParams } from "@/components/types";
import React, { use } from "react";

const MangaOverViewPage = ({ params }: TIdParams) => {
  const { id } = use(params);
  return <MediaOverViewInfos id={`manga-${id}`} />;
};

export default MangaOverViewPage;

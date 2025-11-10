"use client";

import { MediaCharacters } from "@/components/media/characters";
import { TIdParams } from "@/components/types";
import React, { use } from "react";

const MangaCharactersPage = ({ params }: TIdParams) => {
  const { id } = use(params);

  return <MediaCharacters id={`manga-${id}`} />;
};

export default MangaCharactersPage;

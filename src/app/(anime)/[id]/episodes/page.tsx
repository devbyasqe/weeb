"use client";

import { EpisodeCard } from "@/components/cards/media/episode";
import { useAnimeEpisodesStore } from "@/components/store/media/episodes";
import { TIdParams } from "@/components/types";
import { AnimeEpisodesPageLoader } from "@/components/ui/loader";
import { useInView } from "motion/react";
import React, { use, useEffect, useRef } from "react";

const AnimeEpisodesPage = ({ params }: TIdParams) => {
  const { id } = use(params);
  const { animeEpsds, fetchAnimeEpsds, isError } = useAnimeEpisodesStore();

  const data = animeEpsds[id];

  useEffect(() => {
    if (!data) {
      fetchAnimeEpsds(id);
    }
  }, []);

  if (!data || isError) return <AnimeEpisodesPageLoader isError={!!isError} />;

  if (data.data.length === 0) {
    return (
      <div className="py-14 text-center">
        <h2 className="text-red">No episodes found for this anime.</h2>
        <h3 className="text-violet-foreground mt-3 text-balance">
          It might not have any episodes listed yet, or something went wrong
          while fetching them.
        </h3>
      </div>
    );
  }
  return <InfiniteEpisodes animeId={id} />;
};

export default AnimeEpisodesPage;

const InfiniteEpisodes = ({ animeId }: { animeId: string }) => {
  const { animeEpsds, fetchAnimeEpsds } = useAnimeEpisodesStore();
  const data = animeEpsds[animeId];
  const lastRef = useRef(null);
  const isInView = useInView(lastRef, { amount: 0.15 });

  useEffect(() => {
    if (isInView && data && data.pagination.has_next_page) {
      fetchAnimeEpsds(animeId);
    }
  }, [isInView]);

  return (
    <>
      <div className="grid gap-2">
        {data.data.map((episode) => (
          <EpisodeCard key={episode.mal_id} episode={episode} />
        ))}
      </div>
      {data.pagination.has_next_page && (
        <div ref={lastRef} className="">
          <AnimeEpisodesPageLoader noOfItems={4} />
        </div>
      )}
    </>
  );
};

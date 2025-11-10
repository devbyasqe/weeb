import {
  TMediaOverViewInfoCard,
  TMediaOverViewStatsCard,
} from "@/components/types";
import { TAnimeFull } from "@/components/types/anime";
import { TRelation } from "@/components/types/common";
import { TMangaFull } from "@/components/types/manga";
import { axiosInstance, formatScore, normalizeRating } from "@/lib/utils";
import { AxiosError } from "axios";
import { create } from "zustand";

type TOverviewData = {
  stats: TMediaOverViewStatsCard;
  header: { airing: boolean; title: string };
  episodes: boolean;
  overview: {
    infos: TMediaOverViewInfoCard;
    relations: TRelation[];
    trailerUrl?: string | null;
    descriptions: {
      title: string;
      description: string;
    }[];
  };
};

type TUseMediaOverviewStore = {
  overviewData: Record<string, TOverviewData>;
  isError: string | null;
  fetchMediaOverview: (key: string) => Promise<void>;
};

export const useMediaOverviewStore = create<TUseMediaOverviewStore>(
  (set, get) => ({
    overviewData: {},
    isError: null,

    fetchMediaOverview: async (key: string) => {
      const { overviewData } = get();
      if (overviewData[key]) return;

      const [category, id] = key.split("-");
      if (!category || !id) {
        set({ isError: "Invalid key format" });
        return;
      }

      try {
        const response = await axiosInstance.get<{
          data: TAnimeFull | TMangaFull;
        }>(`${category}/${id}/full`);

        const data = response.data.data;

        const baseStat: TMediaOverViewStatsCard = {
          imgSrc:
            data.images?.webp?.large_image_url ||
            data.images?.jpg?.large_image_url ||
            null,
          overViewStats: [],
        };

        const baseInfo: TMediaOverViewInfoCard = { infoStats: [] };
        let airing = false;
        let episodes = false;

        if (category === "manga") {
          const manga = data as TMangaFull;
          airing = manga.publishing;

          baseStat.overViewStats = [
            { title: "Rank", text: manga.rank || "-"},
            { title: "Popularity", text: manga.popularity || "-"},
            { title: "Score", text: formatScore(manga.score)|| "-" },
          ];

          baseInfo.infoStats = [
            {
              title: `${manga.publishing ? "Airing" : "Aired"} Status`,
              text: manga.published?.string ?? "Unknown",
            },
            { title: "Type", text: manga.type },
            ...(manga.authors && manga.authors.length > 0
              ? [
                  {
                    title: "Authors",
                    links:
                      manga.authors?.map((a) => ({
                        label: a.name,
                        link: "/",
                      })) ?? [],
                  },
                ]
              : []),
            ...(manga.genres && manga.genres.length > 0
              ? [
                  {
                    title: "Genres",
                    links:
                      manga.genres?.map((g) => ({
                        label: g.name,
                        link: "/",
                      })) ?? [],
                  },
                ]
              : []),
          ];
        } else {
          const anime = data as TAnimeFull;
          airing = anime.airing;
          if (anime.episodes !== 1) {
            episodes = true;
          }

          baseStat.overViewStats = [
            { title: "Rating", text: normalizeRating(anime.rating) || "-" },
            { title: "Score", text: formatScore(anime.score) || "-" },
            { title: "Rank", text: anime.rank || "-" },
            { title: "Popularity", text: anime.popularity || "-" },
          ];

          baseInfo.infoStats = [
            {
              title: `${anime.airing ? "Airing" : "Aired"} Status`,
              text: anime.aired?.string ?? "Unknown",
            },
            { title: "Type", text: anime.type },
            { title: "Source", text: anime.source },

            ...(anime.studios && anime.studios.length > 0
              ? [
                  {
                    title: "Animation studio",
                    links:
                      anime.studios?.map((s) => ({
                        label: s.name,
                        link: "/",
                      })) ?? [],
                  },
                ]
              : []),
            ...(anime.producers && anime.producers.length > 0
              ? [
                  {
                    title: "Producers",
                    links:
                      anime.producers?.map((p) => ({
                        label: p.name,
                        link: "/",
                      })) ?? [],
                  },
                ]
              : []),
            ...(anime.genres && anime.genres.length > 0
              ? [
                  {
                    title: "Genres",
                    links:
                      anime.genres?.map((g) => ({
                        label: g.name,
                        link: "/",
                      })) ?? [],
                  },
                ]
              : []),
          ];
        }

        set((state) => ({
          overviewData: {
            ...state.overviewData,
            [key]: {
              stats: baseStat,
              header: {
                airing,
                title: data.title ?? "Untitled",
              },
              episodes,
              overview: {
                infos: baseInfo,
                relations: data.relations ?? [],
                trailerUrl: (data as TAnimeFull).trailer?.embed_url ?? null,
                descriptions: [
                  ...(data.synopsis
                    ? [
                        {
                          title: "Synopsis",
                          description:
                            data.synopsis ?? "No synopsis available.",
                        },
                      ]
                    : []),
                  ...(data.background
                    ? [
                        {
                          title: "Background",
                          description:
                            data.background ??
                            "No background information available.",
                        },
                      ]
                    : []),
                ],
              },
            },
          },
          isError: null,
        }));
      } catch (err) {
        set({
          isError: err instanceof AxiosError ? err.message : "Unknown error",
        });
      }
    },
  }),
);

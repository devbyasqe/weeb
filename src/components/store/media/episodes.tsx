import { TAnimeEpisode } from "@/components/types/anime";
import { TSmallPagination } from "@/components/types/common";
import { axiosInstance } from "@/lib/utils";
import { AxiosError } from "axios";
import { create } from "zustand";

type TAnimeOverViewEpsd = {
  data: TAnimeEpisode[];
  pagination: TSmallPagination;
  currentPage: number;
};

type TUseAnimeEpisodesStore = {
  animeEpsds: Record<string, TAnimeOverViewEpsd>;
  isError: string | null;
  fetchAnimeEpsds: (id: string) => Promise<void>;
};

export const useAnimeEpisodesStore = create<TUseAnimeEpisodesStore>(
  (set, get) => ({
    animeEpsds: {},
    isError: null,

    fetchAnimeEpsds: async (id: string) => {
      const { animeEpsds } = get();
      const entry = animeEpsds[id];
      const pageToFetch = entry ? entry.currentPage + 1 : 1;

      if (entry && !entry.pagination.has_next_page) return;

      try {
        const res = await axiosInstance.get<{
          data: TAnimeEpisode[];
          pagination: TSmallPagination;
        }>(`anime/${id}/episodes?page=${pageToFetch}`);

        const { data, pagination } = res.data;
        const prevData = entry?.data ?? [];

        set((state) => ({
          animeEpsds: {
            ...state.animeEpsds,
            [id]: {
              data: [...prevData, ...data],
              pagination,
              currentPage: pageToFetch,
            },
          },
        }));
      } catch (err) {
        set({
          isError: err instanceof AxiosError ? err.message : "Unknown error",
        });
      }
    },
  }),
);

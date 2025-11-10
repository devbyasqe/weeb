import { create } from "zustand";
import { THeroBannerCard } from "@/components/types";
import { axiosInstance, formatDateString, formatScore } from "@/lib/utils";
import { TMangaBase, TMangaList } from "@/components/types/manga";
import { TAnimeBase, TAnimeList } from "@/components/types/anime";
import { AxiosError } from "axios";

export type TCategory = "anime" | "manga";

type TBannerStore = {
  bannerData: Record<string, THeroBannerCard[]>;
  isError: string | null;
  fetchBannerData: (category: TCategory) => Promise<void>;
};

export const useBannerStore = create<TBannerStore>((set, get) => ({
  bannerData: {},
  isError: null,

  fetchBannerData: async (category: TCategory) => {
    const { bannerData } = get();
    if (bannerData[category]) return;

    try {
      let response;

      if (category === "manga") {
        response = await axiosInstance.get<TMangaList>(
          "top/manga?filter=publishing&limit=6",
        );
      } else {
        response = await axiosInstance.get<TAnimeList>(
          "top/anime?type=tv&filter=airing&limit=6",
        );
      }

      const isAnime = category === "anime";

      const list: THeroBannerCard[] = response.data.data.map((item) => ({
        id: item.mal_id,
        imageSrc:
          item.images?.webp?.large_image_url ||
          item.images?.jpg?.large_image_url ||
          null,
        rank: item.rank || 0,
        title: item.title_english || item.title,
        description: item.synopsis || item.background || "",
        score: formatScore(item.score),
        genres: item.genres.map((g) => ({
          label: g.name,
          link: `/${category}?genre=${g.mal_id}`,
        })),
        detailsLink: `${isAnime ? "" : "/manga/"}/${item.mal_id}`,

        trailerUrl: isAnime
          ? (item as TAnimeBase).trailer?.embed_url || null
          : null,
        date: formatDateString(
          isAnime
            ? (item as TAnimeBase).aired?.from
            : (item as TMangaBase).published?.from,
        ),
      }));

      set((state) => ({
        bannerData: { ...state.bannerData, [category]: list },
      }));
    } catch (error) {
      set({
        isError: error instanceof AxiosError ? error.message : "Unknown error",
      });
    }
  },
}));

import { create } from "zustand";
import { axiosInstance } from "@/lib/utils";
import { AxiosError } from "axios";
import {
  TAnimeCharacter,
  TMangaCharacter,
} from "@/components/types/characters";

type TCharacterDetails = TAnimeCharacter | TMangaCharacter;

export type TCharacterpaginatedData = {
  current: number;
  total: number;
  hasMore: boolean;
  displayed: TCharacterDetails[];
};

type TCategory = "anime" | "manga";

type TUseMediaCharacterStore = {
  data: Record<string, TCharacterDetails[]>;
  sorted: Record<string, TCharacterDetails[]>;
  paginatedData: Record<string, TCharacterpaginatedData>;
  sortType: string;
  isError: string | null;

  fetchCharacters: (key: string) => Promise<void>;
  sortCharacters: (key: string, sortType: string) => void;
  fetchMore: (key: string) => void;
};

const PAGE_SIZE = 12;

const parseKey = (key: string): [TCategory, string] | null => {
  const [category, id] = key.split("-") as [TCategory, string];
  return category && id ? [category, id] : null;
};

export const useMediaCharacterStore = create<TUseMediaCharacterStore>(
  (set, get) => ({
    data: {},
    sorted: {},
    paginatedData: {},
    sortType: "Roles",
    isError: null,

    async fetchCharacters(key) {
      const { data } = get();
      if (data[key]) return;

      const parsed = parseKey(key);
      if (!parsed) {
        set({ isError: "Invalid key format" });
        return;
      }

      const [category, id] = parsed;

      try {
        const res = await axiosInstance.get<{ data: TCharacterDetails[] }>(
          `${category}/${id}/characters`,
        );

        const characters = res.data.data;
        const initialPage = characters.slice(0, PAGE_SIZE);

        set((state) => ({
          data: { ...state.data, [key]: characters },
          sorted: { ...state.sorted, [key]: characters },
          paginatedData: {
            ...state.paginatedData,
            [key]: {
              current: 1,
              total: characters.length,
              hasMore: characters.length > PAGE_SIZE,
              displayed: initialPage,
            },
          },
        }));
      } catch (err) {
        set({
          isError: err instanceof AxiosError ? err.message : "Unknown error",
        });
      }
    },

    sortCharacters(key, sortType) {
      const { data } = get();
      const base = data[key];
      if (!base) return;

      const parsed = parseKey(key);
      if (!parsed) {
        set({ isError: "Invalid key format" });
        return;
      }

      const [category] = parsed;
      const sorted = [...base];

      switch (sortType) {
        case "Alphabetical ASC":
          sorted.sort((a, b) =>
            a.character.name.localeCompare(b.character.name),
          );
          break;
        case "Alphabetical DSC":
          sorted.sort((a, b) =>
            b.character.name.localeCompare(a.character.name),
          );
          break;
        case "Favorites ASC":
          if (category === "anime") {
            (sorted as TAnimeCharacter[]).sort(
              (a, b) => (a.favorites ?? 0) - (b.favorites ?? 0),
            );
          }
          break;
        case "Favorites DSC":
          if (category === "anime") {
            (sorted as TAnimeCharacter[]).sort(
              (a, b) => (b.favorites ?? 0) - (a.favorites ?? 0),
            );
          }
          break;
      }

      const displayed = sorted.slice(0, PAGE_SIZE);

      set((state) => ({
        sortType,
        sorted: { ...state.sorted, [key]: sorted },
        paginatedData: {
          ...state.paginatedData,
          [key]: {
            current: 1,
            total: sorted.length,
            hasMore: sorted.length > PAGE_SIZE,
            displayed,
          },
        },
      }));
    },

    fetchMore(key) {
      const { sorted, paginatedData } = get();
      const base = sorted[key];
      const pageInfo = paginatedData[key];
      if (!base || !pageInfo || !pageInfo.hasMore) return;

      const nextPage = pageInfo.current + 1;
      const displayed = base.slice(0, nextPage * PAGE_SIZE);

      set((state) => ({
        paginatedData: {
          ...state.paginatedData,
          [key]: {
            current: nextPage,
            total: base.length,
            hasMore: displayed.length < base.length,
            displayed,
          },
        },
      }));
    },
  }),
);

import { MediaOverViewRecommendation } from "@/components/types/common";
import { axiosInstance } from "@/lib/utils";
import { AxiosError } from "axios";
import { create } from "zustand";

type TUseOverviewRecmStore = {
  overviewRecm: Record<string, MediaOverViewRecommendation[]>;
  isError: string | null;
  fetchOverviewRecm: (key: string) => Promise<void>;
};

export const useOverviewRecmStore = create<TUseOverviewRecmStore>(
  (set, get) => ({
    overviewRecm: {},
    isError: null,

    fetchOverviewRecm: async (key: string) => {
      const { overviewRecm } = get();
      if (overviewRecm[key]) return;

      const [category, id] = key.split("-");
      if (!category || !id) {
        set({ isError: "Invalid key format" });
        return;
      }

      try {
        const res = await axiosInstance.get<{
          data: MediaOverViewRecommendation[];
        }>(`${category}/${id}/recommendations`);
        set((state) => ({
          overviewRecm: {
            ...state.overviewRecm,
            [key]: res.data.data.slice(0, 12),
          },
        }));
      } catch (err) {
        console.log(err);
        set({
          isError: err instanceof AxiosError ? err.message : "Unknown error",
        });
      }
    },
  })
);

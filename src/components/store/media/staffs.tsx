import { TAnimeStaffs } from "@/components/types/anime";
import { axiosInstance } from "@/lib/utils";
import { AxiosError } from "axios";
import { create } from "zustand";

type TUseAnimeStaffsStore = {
  animeStaffs: Record<string, Record<string, TAnimeStaffs[]>>;
  isError: string | null;
  fetchAnimeStaff: (id: string) => Promise<void>;
};

export const useAnimeStaffsStore = create<TUseAnimeStaffsStore>((set, get) => ({
  animeStaffs: {},
  isError: null,

  fetchAnimeStaff: async (id: string) => {
    const { animeStaffs } = get();
    if (animeStaffs[id]) return;

    try {
      const res = await axiosInstance.get<{ data: TAnimeStaffs[] }>(
        `anime/${id}/staff`,
      );

      const groupedByPosition = res.data.data.reduce<
        Record<string, TAnimeStaffs[]>
      >((acc, staff) => {
        staff.positions.forEach((position) => {
          if (!acc[position]) acc[position] = [];
          acc[position].push(staff);
        });
        return acc;
      }, {});

      set((state) => ({
        animeStaffs: { ...state.animeStaffs, [id]: groupedByPosition },
      }));
    } catch (err) {
      set({
        isError: err instanceof AxiosError ? err.message : "Unknown error",
      });
    }
  },
}));

import { create } from "zustand";

type TUseNavbarStore = {
  isScrolled: boolean;
  isNavBarHidden: boolean;
  isMobileNavOpened: boolean;
  showNavbar: () => void;
  hideNavbar: () => void;
  toggleMobileNavbarVisibility: () => void;
  setIsScrolled: (value: boolean) => void;
};

export const useNavbarStore = create<TUseNavbarStore>((set) => ({
  isNavBarHidden: false,
  isMobileNavOpened: false,
  isScrolled: false,

  showNavbar: () => set({ isNavBarHidden: false }),
  hideNavbar: () => set({ isNavBarHidden: true }),

  toggleMobileNavbarVisibility: () =>
    set((state) => ({ isMobileNavOpened: !state.isMobileNavOpened })),

  setIsScrolled: (value: boolean) => set({ isScrolled: value }),
}));

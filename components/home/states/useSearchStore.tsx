import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ISearchStore {
  location: string;
  setLocation: (value: string) => void;
}

export const DEFAULT_LOCATION = "San Francisco, CA";

export const useSearchStore = create<ISearchStore>()(
  persist(
    (set) => ({
      location: DEFAULT_LOCATION,
      setLocation: (value: string) => set({ location: value }),
    }),
    {
      name: "search-location",
    }
  )
);

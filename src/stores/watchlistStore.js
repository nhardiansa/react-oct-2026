import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useWatchlist = create()(
  persist(
    (set, get) => ({
      watchlist: [],
      addToWatchlist: (movie) =>
        set((state) => ({ watchlist: [...state.watchlist, movie] })),
      removeFromWatchlist: (movie) =>
        set((state) => ({
          watchlist: state.watchlist.filter((m) => m.id !== movie.id),
        })),
      hasInWatchlist: (movie) => {
        return get().watchlist.some((m) => m.id === movie.id)
      }
    }),
    {
      name: "watchlist",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

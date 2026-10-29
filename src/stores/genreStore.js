import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useGenres = create()(
  persist(
    (set) => ({
      genres: [],
      setGenres: (genres) =>
        set({
          genres,
        }),
    }),
    {
      name: "genre-storage", // unique name for the storage
    },
  )
)

export const getGenres = async () => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list",
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
}

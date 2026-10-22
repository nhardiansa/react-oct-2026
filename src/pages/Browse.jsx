import { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

function Browse() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    searchMovies();
  };

  useEffect(() => {
    // searchMovies()
  }, []);

  const searchMovies = async () => {
    try {
      if (!query) return;

      // set loading true
      setLoading(true);

      // fetch api movie search by keyword
      const rawResults = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&page=1`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        },
      );
      const results = await rawResults.json();
      const movies = results.results;
      const finalMovies = movies.map((m) => ({
        id: m.id,
        title: m.title,
        rating: m.vote_average.toFixed(1),
        imgUrl: m.poster_path
          ? `https://image.tmdb.org/t/p/w200${m.poster_path}`
          : `https://placehold.co/200x300?text=${m.title}`,
        year: m.release_date.substring(0, 4),
      }));

      // set movies
      setMovies(finalMovies);

      // set loading false
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Navbar title={"SINEMATA"} />

      {/* Heading */}
      <div className="search-content mt-8 text-white font-inter">
        <div className="content-wrapper max-w-7xl mx-auto">
          {/* Heading */}
          <div className="flex items-center gap-x-3">
            <div className="ornament w-1 h-8 bg-amber-600"></div>
            <h2 className="font-bebas text-4xl">BROWSE FILMS</h2>
          </div>

          {/* Search Input */}
          <form onSubmit={submitHandler}>
            <input
              type="text"
              className="bg-[#1C2127] border border-[#3A4049] rounded-xl py-4 px-4 w-full mt-10"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>

          <p className="text-gray-400 mt-4">
            Ditemukan <span className="text-amber-600 font-bold">10 film</span>{" "}
            untuk pencarian "wasd"
          </p>

          {/* Dynamic Filter Search Button */}
          <div className="container mt-8 flex gap-x-2">
            <button className="cursor-pointer bg-amber-600 hover:bg-amber-700 rounded-full py-2 px-4 font-bold text-gray-900">
              Semua
            </button>
            <button className="cursor-pointer bg-[#1C2127] hover:bg-gray-800 border border-[#3A4049] rounded-full py-2 px-4 text-gray-400">
              Movie
            </button>
            <button className="cursor-pointer bg-[#1C2127] hover:bg-gray-800 border border-[#3A4049] rounded-full py-2 px-4 text-gray-400">
              Series
            </button>
            <button className="cursor-pointer bg-[#1C2127] hover:bg-gray-800 border border-[#3A4049] rounded-full py-2 px-4 text-gray-400">
              2020+
            </button>
            <button className="cursor-pointer bg-[#1C2127] hover:bg-gray-800 border border-[#3A4049] rounded-full py-2 px-4 text-gray-400">
              2010-2019
            </button>
            <button className="cursor-pointer bg-[#1C2127] hover:bg-gray-800 border border-[#3A4049] rounded-full py-2 px-4 text-gray-400">
              Sebelum 2010
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {movies.length ? (
        <div className="max-w-[1300px] mx-auto">
          {/* <!-- List Card --> */}
          <div className="cards-wrapper flex flex-wrap gap-x-4 gap-y-8 mt-8">
            {movies.map((m, i) => (
              <Card
                key={m.id}
                id={m.id}
                title={m.title}
                imgUrl={m.imgUrl}
                rating={m.rating}
                year={m.year}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-x-2 mt-8 w-full justify-center">
            <button
              className={`cursor-pointer bg-amber-600 hover:bg-amber-700 rounded-full py-2 px-4 font-bold text-gray-900`}
            >
              Load More
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-30">
          <p className="text-center">Movie tidak ada</p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900/70 text-white">
          <p className="text-base font-medium tracking-wide">
            <span className="loading loading-spinner text-white"></span> Sedang
            Memuat...
          </p>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Browse;

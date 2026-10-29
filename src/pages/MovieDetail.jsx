/* eslint-disable react-hooks/set-state-in-effect */
import { useParams } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import useWatchlistFirebase from "../hooks/useWatchlistFirebase";
import {
  addToWatchlist as addToWatchlistFirebase,
  removeFromWatchlist as removeFromWatchlistFirebase,
} from "../lib/watchlists";
import { useAuth } from "../stores/authStore";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

function MovieDetail() {
  const { id } = useParams();
  const { user } = useAuth((state) => state);

  const itemsFirebase = useWatchlistFirebase(user);

  const [movieDetail, setMovieDetail] = useState({
    id: null,
    imgPoster: "",
    imgBackdrop: "",
    title: "",
    rating: null,
    year: null,
    duration: null,
    genre: [],
    age: null,
    sinopsis: "",
    language: "",
    cast: [],
    crew: {
      director: "",
      writer: "",
      studio: "",
      country: "",
      releaseDate: "",
    },
  });
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const getMovieDetail = async (id) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.json();

      setMovieDetail({
        id: data.id,
        imgPoster: data.poster_path
          ? `https://image.tmdb.org/t/p/w300${data.poster_path}`
          : "",
        imgBackdrop: data.backdrop_path
          ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
          : "",
        title: data.title || "",
        rating: data.vote_average ? data.vote_average.toFixed(1) : null,
        year: data.release_date
          ? new Date(data.release_date).getFullYear()
          : null,
        // duration type is like 2h 18m, so we need to convert runtime in minutes to this format
        duration: data.runtime
          ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
          : null,
        genre: data.genres?.map((g) => g.name) || [],
        age: data.adult ? "R" : "PG-13",
        sinopsis: data.overview || "",
        language: data.spoken_languages.length
          ? data.spoken_languages[0].name
          : "",
        budget: data.budget ? `$${data.budget.toLocaleString()}` : 0,
        revenue: data.revenue ? `$${data.revenue.toLocaleString()}` : 0,
        cast: [],
        crew: {
          director: "",
          writer: "",
          studio: data.production_companies.length
            ? data.production_companies[0].name
            : "",
          country: data.production_countries.length
            ? data.production_countries[0].name
            : "",
          releaseDate: data.release_date
            ? new Date(data.release_date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "",
        },
      });

      return data;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return null;
    }
  };

  const getMovieCredits = async (id) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        },
      );
      const data = await response.json();

      // get director from crew
      const director = data.crew.find((c) => c.job === "Director");
      const writer = data.crew.find((c) => c.job === "Writer");

      setMovieDetail((prev) => ({
        ...prev,
        cast: data.cast?.slice(0, 5) || [],
        crew: {
          ...prev.crew,
          director: director ? director.name : "",
          writer: writer ? writer.name : "",
        },
      }));
    } catch (error) {
      console.error("Error fetching movie credits:", error);
      alert("Failed to fetch movie credits. Please try again later.");
    }
  };

  const hasInWatchlist = (movie) => {
    return itemsFirebase.some((m) => m.movieId === movie.id);
  };

  const watchlistHandler = async (movie) => {
    if (hasInWatchlist(movie)) {
      await removeFromWatchlistFirebase(user, movie);
      setIsInWatchlist(false);
    } else {
      await addToWatchlistFirebase(user, movie);
      setIsInWatchlist(true);
    }
  };

  useEffect(() => {
    if (id) {
      console.log("Fetching movie details for ID:", itemsFirebase);
      getMovieDetail(id);
      getMovieCredits(id);
    }
  }, [id, itemsFirebase]);

  useEffect(() => {
    setIsInWatchlist(hasInWatchlist(movieDetail));
  }, [itemsFirebase, id, movieDetail]);

  return (
    <div className="page min-h-screen">
      <Navbar title={"SINEMATA"} />

      <div className="content font-inter pb-20">
        <div className="heading-content relative">
          {/* Hero Background */}
          <div className="hero-background">
            {/* this background have gradient overlay black from bottom to top but black in top is black with 50% opacity */}
            <div className="gradient-overlay absolute bottom-0 left-0 w-full h-full bg-linear-to-t from-black to-[rgba(0,0,0,0.2)]"></div>
            <img
              src={
                movieDetail?.imgBackdrop
                  ? movieDetail.imgBackdrop
                  : "https://placehold.co/1600x400?text=Loading..."
              }
              alt={movieDetail?.title || "Loading..."}
              className="w-full h-95 object-cover object-center"
            />
          </div>

          {/* Movie Detail */}
          <div className="movie-detail-heading absolute -bottom-45 left-0 w-full">
            <div className="wrapper w-full max-w-7xl mx-auto flex items-start">
              {/* Image poster portrait */}
              <div className="image-container w-70 h-105">
                <img
                  src={
                    movieDetail?.imgPoster
                      ? movieDetail.imgPoster
                      : "https://placehold.co/200x300?text=Loading..."
                  }
                  alt={movieDetail?.title || "Loading..."}
                  className="w-full h-full rounded-xl object-cover border-2 border-[#3A4049]"
                />
              </div>

              {/* Movie Title and CTA */}
              <div className="movie-title-cta ml-8 pt-7.5">
                {/* title */}
                <h1 className="text-[56px] mt-0.5 mb-3.5 font-bebas font-normal">
                  {movieDetail?.title || "Loading..."}
                </h1>
                {/* rating, year,duration, genre, age */}
                <div className="flex items-center gap-x-4 mt-3">
                  <div className="rating-badge">
                    <span className="text-sm font-bold bg-[#FBBF2426] px-2 py-1.5 rounded-sm text-[#FBBF24]">
                      ★ {movieDetail?.rating || "N/A"} / 10
                    </span>
                  </div>
                  <span className="text-sm text-[#A9A9A9]">
                    {movieDetail?.year} · {movieDetail?.duration} ·{" "}
                    {movieDetail?.genre?.join(", ")} · {movieDetail?.age}
                  </span>
                </div>

                {/* CTA (Watch Trailer, Add to Watchlist, Like) */}
                <div className="cta-buttons flex items-center gap-x-4 mt-7.25">
                  <button className="bg-[#FF8000] disabled:bg-gray-500 disabled:cursor-not-allowed py-3.25 px-7 rounded-lg text-black font-bold text-sm hover:bg-[#ff8000cc] transition duration-300 cursor-pointer">
                    ▶ Tonton Trailer
                  </button>

                  {isInWatchlist ? (
                    <button
                      onClick={() => watchlistHandler(movieDetail)}
                      className={`bg-red-500 hover:bg-red-600 py-3.25 px-7 rounded-lg text-white font-bold text-sm $hover:bg-[#3a4049cc] transition duration-300 cursor-pointer flex items-center gap-x-2`}
                    >
                      <span className="material-icons-round"> delete </span>{" "}
                      Hapus dari Watchlist
                    </button>
                  ) : (
                    <button
                      onClick={() => watchlistHandler(movieDetail)}
                      className={`bg-[#3A4049] hover:bg-gray-600 py-3.25 px-7 rounded-lg text-white font-bold text-sm $hover:bg-[#3a4049cc] transition duration-300 cursor-pointer flex items-center gap-x-2`}
                    >
                      <span className="material-icons-round"> add </span> Tambah
                      ke Watchlist
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Movie Description */}
        <div className="movie-description w-full max-w-7xl mx-auto mt-60 px-4 flex gap-x-14">
          {/* Sinopsis and Cast */}
          <div className="sinopsis-cast max-w-180.25">
            <div className="sinopsis flex flex-col gap-y-4.5">
              <h2 className="text-2xl font-bebas">SINOPSIS</h2>
              <p className="text-[#A9A9A9] text-sm leading-relaxed">
                {movieDetail?.sinopsis || "Loading..."}
              </p>
            </div>
            <div className="casts flex flex-col mt-9.75 gap-y-7.25">
              <h2 className="text-2xl font-bebas">CAST UTAMA</h2>
              <div className="list-cast flex items-start gap-x-7 overflow-x-auto">
                {movieDetail?.cast?.length > 0 ? (
                  movieDetail.cast.map((castMember) => (
                    <div
                      key={castMember.id}
                      className="cast flex flex-col items-center w-27 shrink-0 text-center"
                    >
                      <img
                        src={
                          castMember.profile_path
                            ? `https://image.tmdb.org/t/p/w200${castMember.profile_path}`
                            : `https://placehold.co/65x65?text=${castMember.name}`
                        }
                        alt={castMember.name}
                        className="w-16.25 h-16.25 border border-[#3A4049] rounded-full object-cover"
                      />
                      <p className="text-white mt-2">{castMember.name}</p>
                      <span>
                        <p className="text-[#6B7280] text-sm">
                          as {castMember.character}
                        </p>
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-[#6B7280] text-sm">Loading...</p>
                )}
              </div>
            </div>
          </div>

          {/* Crew */}
          <div className="crew-card bg-[#1C2127] border border-[#2A2F37] rounded-lg pt-8 pb-11.25 px-5.5 w-fit flex flex-col mt-12 gap-y-4.5 h-fit">
            <div className="w-59 flex justify-between pb-1.25 border-b border-[#2A2F37]">
              <span className="text-sm text-[#6B7280]">Sutradara</span>
              <span className="text-white text-sm">
                {movieDetail?.crew?.director || "Loading..."}
              </span>
            </div>
            <div className="w-59 flex justify-between pb-1.25 border-b border-[#2A2F37]">
              <span className="text-sm text-[#6B7280]">Penulis</span>
              <span className="text-white text-sm">
                {movieDetail?.crew?.writer || "Loading..."}
              </span>
            </div>
            <div className="w-59 flex justify-between pb-1.25 border-b border-[#2A2F37]">
              <span className="text-sm text-[#6B7280]">Studio</span>
              <span className="text-white text-sm">
                {movieDetail?.crew?.studio || "Loading..."}
              </span>
            </div>
            <div className="w-59 flex justify-between pb-1.25 border-b border-[#2A2F37]">
              <span className="text-sm text-[#6B7280]">Negara</span>
              <span className="text-white text-sm">
                {movieDetail?.crew?.country || "Loading..."}
              </span>
            </div>
            <div className="w-59 flex justify-between pb-1.25 border-b border-[#2A2F37]">
              <span className="text-sm text-[#6B7280]">Rilis</span>
              <span className="text-white text-sm">
                {movieDetail?.crew?.releaseDate || "Loading..."}
              </span>
            </div>
            <div className="w-59 flex justify-between pb-1.25 border-b border-[#2A2F37]">
              <span className="text-sm text-[#6B7280]">Bahasa</span>
              <span className="text-white text-sm">
                {movieDetail?.language || "Loading..."}
              </span>
            </div>
            <div className="w-59 flex justify-between pb-1.25 border-b border-[#2A2F37]">
              <span className="text-sm text-[#6B7280]">Budget</span>
              <span className="text-white text-sm">
                {movieDetail?.budget || "Loading..."}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MovieDetail;

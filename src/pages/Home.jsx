import { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { useGenres } from "../stores/genreStore";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTY5NzNhNGE2YjhlNTJmMzFhNDFlYTdkNDM4Mjk0MyIsIm5iZiI6MTYzNTE1MTk4Ny43NTcsInN1YiI6IjYxNzY3MDczNmUwZDcyMDAyNDZhZDAwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zok9IaVBfX4-RSyU0O9iroE8nIFrHRDQok086ng2qP0",
  },
};

function Home() {
  const [movies, setMovies] = useState([]);
  const { genres } = useGenres((state) => state);

  const getTrendingMovies = async () => {
    try {
      // if (!query) return;

      // set loading true
      // setLoading(true);

      // fetch api movie search by keyword
      const rawResults = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
        options,
      );
      const results = await rawResults.json();
      const movies = results.results;
      const finalMovies = movies
        .map((m) => ({
          id: m.id,
          title: m.title,
          rating: m.vote_average.toFixed(1),
          imgUrl: m.poster_path
            ? `https://image.tmdb.org/t/p/w200${m.poster_path}`
            : `https://placehold.co/200x300?text=${m.title}`,
          year: m.release_date.substring(0, 4),
          genre_ids: m.genre_ids,
        }))
        .slice(0, 6);

      // set movies
      setMovies(finalMovies);

      // set loading false
      // setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);

  return (
    <>
      <Navbar title={"SINEMATA"} />
      <Hero />

      <section id="trending" className="container max-w-325 mx-auto mt-12">
        {/* <!-- Heading --> */}
        <div className="heading flex items-center gap-x-3">
          <div className="orange-bar bg-[#FF8000] w-1 h-6.5"></div>
          <h2 className="heading-text text-white font-bebas text-3xl">
            TRENDING NOW
          </h2>
        </div>
        {/* <!-- Grid --> */}
        <div className="card-container flex gap-x-3 mt-8 max-w-325 overflow-x-hidden">
          {movies.map((movie) => {
            const moviesGenres = movie.genre_ids
              .map((id) => {
                const genre = genres.find((g) => g.id === id);
                return genre ? genre.name : null;
              })
              .filter(Boolean);

            return (
              <Card
                key={movie.id}
                id={movie.id}
                title={movie.title}
                imgUrl={movie.imgUrl}
                rating={movie.rating}
                year={movie.year}
                genres={moviesGenres}
              />
            );
          })}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;

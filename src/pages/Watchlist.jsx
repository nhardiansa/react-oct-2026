import Footer from "../components/Footer";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import useWatchlistFirebase from "../hooks/useWatchlistFirebase";
import { useAuth } from "../stores/authStore";

function Watchlist() {
  const { user } = useAuth((state) => state);
  const watchlist = useWatchlistFirebase(user); // Assuming you have a user object from your auth context

  return (
    <>
      <Navbar title={"SINEMATA"} />

      <div className="max-w-7xl mx-auto min-h-[61vh]">
        <div className="flex items-center gap-x-3 mt-8">
          <div className="ornament w-1 h-8 bg-amber-600"></div>
          <h2 className="font-secondary text-4xl font-bebas">my watchlist</h2>
        </div>

        {/* List Movie */}
        <div className="mt-8 grid grid-cols-6 gap-6">
          {watchlist.map((movie) => (
            <Card
              key={movie.id}
              id={movie.movieId}
              title={movie.title}
              rating={movie.rating}
              imgUrl={movie.posterPath}
              year={movie.year}
              genres={movie.genre}
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Watchlist;

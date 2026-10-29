import { useEffect, useState } from "react";
import { Link } from "react-router";
import useWatchlistFirebase from "../hooks/useWatchlistFirebase";
import { useAuth } from "../stores/authStore";
import { addToWatchlist, removeFromWatchlist } from "../lib/watchlists";

function Card({ id, title, imgUrl, rating, year, genres }) {
  const { user } = useAuth((state) => state);
  const itemsWatchlist = useWatchlistFirebase(user); // Assuming you have a user object from your auth context
  const [inWatchlist, setInWatchlist] = useState(false);

  const isInWatchlist = () => {
    return itemsWatchlist.some((m) => m.movieId === id);
  };

  useEffect(() => {
    if (itemsWatchlist.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInWatchlist(isInWatchlist());
    }
  }, [itemsWatchlist]);

  const watchlistHandler = async () => {
    if (inWatchlist) {
      // Remove from watchlist
      await removeFromWatchlist(user, {
        id,
        title,
        imgUrl,
        rating,
        year,
        genres,
      });
      setInWatchlist(false);
    } else {
      // Add to watchlist
      // Assuming you have an addToWatchlist function similar to removeFromWatchlist
      await addToWatchlist(user, {
        id,
        title,
        imgPoster: imgUrl,
        rating,
        year,
        genre: genres,
      });
      setInWatchlist(true);
    }
  };

  return (
    <div className="card w-50 flex flex-col gap-y-2">
      <div className="image w-full h-75 relative">
        <img
          className="object-cover h-full w-full rounded-lg"
          src={imgUrl || `https://placehold.co/200x300?text=${title}`}
          alt=""
        />
        <button
          onClick={watchlistHandler}
          className="absolute top-2 right-2 w-9 h-9 bg-black/30 rounded-full flex items-center justify-center"
        >
          <span
            className={`material-icons-round ${inWatchlist ? "text-red-500" : "text-white"} cursor-pointer`}
          >
            favorite
          </span>
        </button>
      </div>
      <div className="typo">
        <div className="title-rating flex w-full justify-between">
          <Link
            to={`/movie/${id}`}
            className="text-white font-inter font-bold text-sm hover:underline max-w-4/5"
          >
            {title}
          </Link>
          <span className="rating font-inter font-bold text-xs text-yellow-600">
            ★ {rating}
          </span>
        </div>
        <div className="year">
          <span className="font-inter text-xs text-gray-500">{year}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;

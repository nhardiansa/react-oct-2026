import Browse from "./pages/Browse";
import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import MovieDetail from "./pages/MovieDetail";
import Watchlist from "./pages/Watchlist";
import Login from "./pages/Login";
import { HaveToLogin, NeedLogin } from "./components/Protected";
import { useGenres, getGenres } from "./stores/genreStore";
import { useEffect } from "react";

function App() {
  const { genres, setGenres } = useGenres((state) => state);

  const fetchGenres = async () => {
    const fetchedGenres = await getGenres();
    setGenres(fetchedGenres);
  };

  useEffect(() => {
    if (!genres || genres.length === 0) {
      fetchGenres();
    }
  }, []);

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route
        path="/watchlist"
        element={
          <HaveToLogin>
            <Watchlist />
          </HaveToLogin>
        }
      />
      <Route
        path="/login"
        element={
          <NeedLogin>
            <Login />
          </NeedLogin>
        }
      />
    </Routes>
  );
}

export default App;

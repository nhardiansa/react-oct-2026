import Browse from "./pages/Browse";
import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import MovieDetail from "./pages/MovieDetail";
import Watchlist from "./pages/Watchlist";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/watchlist" element={<Watchlist />} />
    </Routes>
  );
}

export default App;

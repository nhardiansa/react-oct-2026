import Browse from "./pages/Browse";
import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import MovieDetail from "./pages/MovieDetail";
import Watchlist from "./pages/Watchlist";
import Login from "./pages/Login";
import { HaveToLogin, NeedLogin } from "./components/Protected";

function App() {
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

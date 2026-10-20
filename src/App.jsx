import Browse from "./pages/Browse";
import Home from "./pages/Home";
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/browse" element={<Browse />} />
    </Routes>
  );
}

export default App;

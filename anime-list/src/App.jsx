import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "./components/Home";
import AnimeDetail from "./components/AnimeDetail/AnimeDetail";
import Watchlist from "./components/WatchList/Watchlist";

function App() {
  return (
    <HashRouter>
      <>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/anime/:category" element={<AnimeDetail />} />
          <Route exact path="/watchlist" element={<Watchlist />} />
        </Routes>
      </>
    </HashRouter>
  );
}

export default App;

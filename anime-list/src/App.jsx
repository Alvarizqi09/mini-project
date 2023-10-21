import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "./components/Home";
import AnimeDetail from "./components/AnimeDetail/AnimeDetail";
import LandingPage from "./components/LandingPage/LandingPage";
import CustomerServices from "./components/CustomerServices/CustomerServices";

function App() {
  return (
    <HashRouter>
      <>
        <Routes>
          <Route exact path="/listanime" element={<Home />} />
          <Route exact path="/customerservices" element={<CustomerServices />} />
          <Route exact path="/" element={<LandingPage/>} />
          <Route exact path="/anime/:category" element={<AnimeDetail />} />
        </Routes>
      </>
    </HashRouter>
  );
}

export default App;

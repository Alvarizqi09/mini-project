import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import AnimeDetail from "./components/AnimeDetail/AnimeDetail";
import LandingPage from "./components/LandingPage/LandingPage";
import CustomerServices from "./components/CustomerServices/CustomerServices";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/listanime" element={<Home />} />
        <Route path="/customerservices" element={<CustomerServices />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/anime/:category" element={<AnimeDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import MainContent from "../components/MainContent";
import Sidebar from "../components/Sidebar/Sidebar";
import axios from "axios";
import Footer from "../components/Footer/Footer";

function Home() {
  const [animeList, setAnimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [popularAnime, setPopularAnime] = useState([]);
  const [search, setSearch] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All Anime");

  const getTopAnime = async () => {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/top/anime?filter=airing`
      );
      setTopAnime(response.data.data?.slice(0, 5));
      setAnimeList(response.data.data);
      setActiveFilter("List Anime"); 
    } catch (error) {
      console.error("Error fetching top anime:", error);
    }
  };

  const getPopularAnime = async () => {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/top/anime?filter=bypopularity`
      );
      setPopularAnime(response.data.data?.slice(0, 5));
      setActiveFilter("Popular Anime"); 
    } catch (error) {
      console.error("Error fetching popular anime:", error);
    }
  };

  const getFilteredAnime = async (value) => {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/top/anime?filter=${value}`
      );
      setAnimeList(response.data.data);
      setActiveFilter(value + " Anime");
    } catch (error) {
      console.error("Error fetching filtered anime:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAnime(search);
  };

  const handleFilter = (value) => {
    getFilteredAnime(value);
  };

  const addToWatchlist = (anime) => {
    setWatchlist([...watchlist, anime]);
  };

  const removeFromWatchlist = (anime) => {
    setWatchlist(watchlist.filter((item) => item.mal_id !== anime.mal_id));
  };

  const fetchAnime = async (query) => {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${query}&order_by=popularity&sort=asc&sfw`
      );
      setAnimeList(response.data.data);
    } catch (error) {
      console.error("Error fetching anime:", error);
    }
  };

  useEffect(() => {
    getTopAnime();
    getPopularAnime();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="flex w-full flex-col sm:flex-row bg-gray-300 overflow-x-hidden">
        <Sidebar topAnime={topAnime} popularAnime={popularAnime} />
        <MainContent
          handleSearch={handleSearch}
          handleFilter={handleFilter}
          search={search}
          setSearch={setSearch}
          animeList={animeList}
          watchlist={watchlist}
          addToWatchlist={addToWatchlist}
          removeFromWatchlist={removeFromWatchlist}
          activeFilter={activeFilter}
          className="ml-5 sm:ml-5"
        />
      </div>
      <Footer/>
    </div>
  );
}

export default Home;

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [newAnime, setNewAnime] = useState({ title: "" });
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(savedWatchlist);

    fetch("https://api.jikan.moe/v4/top/anime")
      .then((response) => response.json())
      .then((data) => {
        setAnimeList(data.data);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const handleCreate = () => {
    if (newAnime.title) {
      setWatchlist([...watchlist, { id: Date.now(), ...newAnime }]);
      setNewAnime({ title: "" });
    }
  };

  const handleUpdate = () => {
    if (selectedAnime) {
      const updatedWatchlist = watchlist.map((anime) =>
        anime.id === selectedAnime.id ? { ...anime, ...selectedAnime } : anime
      );
      setWatchlist(updatedWatchlist);
      setSelectedAnime(null);
    }
  };

  const handleDelete = (id) => {
    const updatedWatchlist = watchlist.filter((anime) => anime.id !== id);
    setWatchlist(updatedWatchlist);
  };

  return (
    <div className="bg-gray-100 p-4">
      <NavLink to="/" className="text-blue-500 text-sm mb-4">
        Kembali ke Beranda
      </NavLink>
      <h2 className="text-2xl font-semibold mb-4">Watchlist</h2>
      <ul className="space-y-4">
        {watchlist.map((anime) => (
          <li
            key={anime.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
          >
            <span className="text-lg text-gray-800">{anime.title}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleDelete(anime.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Hapus
              </button>
              <button
                onClick={() => setSelectedAnime(anime)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <h3 className="text-lg font-semibold">
          {selectedAnime ? "Edit Anime" : "Tambah Anime Baru"}
        </h3>
        <select
          value={selectedAnime ? selectedAnime.title : newAnime.title}
          onChange={(e) =>
            selectedAnime
              ? setSelectedAnime({ ...selectedAnime, title: e.target.value })
              : setNewAnime({ title: e.target.value })
          }
          className="w-full py-2 px-4 border rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="">Pilih Anime</option>
          {animeList.map((anime) => (
            <option key={anime.mal_id} value={anime.title}>
              {anime.title}
            </option>
          ))}
        </select>
        {selectedAnime ? (
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600"
          >
            Simpan Perubahan
          </button>
        ) : (
          <button
            onClick={handleCreate}
            className="bg-green-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-600"
          >
            Tambahkan ke Watchlist
          </button>
        )}
      </div>
    </div>
  );
}

export default Watchlist;

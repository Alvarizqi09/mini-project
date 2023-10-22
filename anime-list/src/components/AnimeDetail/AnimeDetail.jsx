import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Tooltip } from "@mui/material";

function AnimeDetail() {
  const { category } = useParams();
  const [anime, setAnime] = useState({});
  const [characters, setCharacters] = useState([]);

  const fetchAnime = async (category) => {
    const temp = await fetch(`https://api.jikan.moe/v4/anime/${category}`).then(
      (res) => res.json()
    );

    setAnime(temp.data);
  };

  const fetchCharacters = async (anime) => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/anime/${anime}/characters`
    ).then((res) => res.json());

    let sortedData = temp?.data.sort((a, b) =>
      a.favorites < b.favorites ? 1 : -1
    );
    setCharacters(sortedData?.slice(0, 10));
  };

  useEffect(() => {
    if (category) {
      fetchAnime(category);
      fetchCharacters(category);
    }
  }, [category]);

  return (
    <div>
      <h1 className="flex font-medium leading-6 mt-2 mb-2 ml-2 gap-4">
        <NavLink to="/listanime">
          <Tooltip title="Back">
            <ArrowBackIosIcon className="back-button text-black" />
          </Tooltip>
        </NavLink>
        {anime?.title_english || anime?.title_japanese}
      </h1>
      <div className="text-sm ml-2 mr-2">
        <div className="py-2">{anime?.synopsis}</div>
        <div className="py-2">{anime?.background}</div>
      </div>
      <div className="relative flex p-4 mt-10 mb-0 bg-white border border-blue-200">
        <div className="w-1/2">
          <img src={anime?.images?.jpg?.image_url} alt="" />
        </div>
        <div className="p-2">
          <div className="font-semibold">
            <span className="text-gray-700">Rank: </span>
            <span>{anime?.rank}</span>
          </div>
          <div className="font-semibold">
            <span className="text-gray-700">Popularity: </span>
            <span>{anime?.popularity}</span>
          </div>
          <div className="font-semibold">
            <span className="text-gray-700">Score: </span>
            <span>{anime?.score}</span>
          </div>
          <div className="font-semibold">
            <span className="text-gray-700">Members: </span>
            <span>{anime?.members}</span>
          </div>
          <div className="font-semibold">
            <span className="text-gray-700">Source: </span>
            <span>{anime?.source}</span>
          </div>
          <div className="font-semibold">
            <span className="text-gray-700">Duration: </span>
            <span>{anime?.duration}</span>
          </div>
          <div className="font-semibold">
            <span className="text-gray-700">Status: </span>
            <span>{anime?.status}</span>
          </div>
          <div className="font-semibold">
            <span className="text-gray-700">Rating: </span>
            <span>{anime?.rating}</span>
          </div>
        </div>
      </div>
      {characters?.length > 0 && (
        <div className="p-2">
          <h1 className="text-xl font-medium">Characters</h1>
          <div className="flex flex-wrap">
            {characters?.map((item) => (
              <div className="flex-shrink-0 w-1/10 max-w-10 p-2" key={item.character.mal_id}>
                <span>{item.character.name}</span>
                <div>
                  <img
                    className="w-40 h-52"
                    src={item.character.images.jpg.image_url}
                    alt=""
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {anime?.trailer?.embed_url && (
        <div className="p-2">
          <h1 className="text-xl font-medium">Trailer</h1>
          <div>
            <iframe
              title="Inline Frame Example"
              className="w-full h-64"
              src={anime?.trailer?.embed_url}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnimeDetail;

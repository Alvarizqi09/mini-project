import { useEffect, useState, useCallback } from "react";
import { useParams, NavLink } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Tooltip } from "@mui/material";
import Comments from "../Comments/Comments";

function AnimeDetail() {
  const { category } = useParams();
  const [anime, setAnime] = useState({});
  const [characters, setCharacters] = useState([]);
  const [animeComments, setAnimeComments] = useState([]);

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

  const fetchComments = useCallback(() => {
    const storedComments = localStorage.getItem(`comments-${category}`);
    if (storedComments) {
      setAnimeComments(JSON.parse(storedComments));
    }
  }, [category]);

  const addComment = (comment) => {
    setAnimeComments((prevComments) => [...prevComments, comment]);
    localStorage.setItem(
      `comments-${category}`,
      JSON.stringify([...animeComments, comment])
    );
  };

  const editComment = (index, editedComment) => {
    const updatedComments = [...animeComments];
    updatedComments[index] = editedComment;
    setAnimeComments(updatedComments);
    localStorage.setItem(`comments-${category}`, JSON.stringify(updatedComments));
  };

  const deleteComment = (index) => {
    const updatedComments = animeComments.filter((_, i) => i !== index);
    setAnimeComments(updatedComments);
    localStorage.setItem(`comments-${category}`, JSON.stringify(updatedComments));
  };

  useEffect(() => {
    if (category) {
      fetchAnime(category);
      fetchCharacters(category);
      fetchComments();
    }
  }, [category, fetchComments]);

  return (
    <div className="p-4 bg-gradient-to-r from-blue-900 to-purple-900 min-h-screen flex"> {/* Tambahkan flex */}
    <div className="bg-gray-100 rounded-lg p-4 shadow-lg w-2/3 mr-4"> {/* Tambahkan w-2/3 dan mr-4 */}
      <h1 className="text-2xl font-medium mb-2">
        <NavLink to="/listanime">
          <Tooltip title="Back">
            <ArrowBackIosIcon className="back-button text-black" />
          </Tooltip>
        </NavLink>
        {anime?.title_english || anime?.title_japanese}
      </h1>
      <div className="text-sm">
        <div className="py-2">{anime?.synopsis}</div>
      </div>
      <div className="relative flex p-4 mt-4 bg-gray-200 border border-blue-200 rounded-lg">
        <div className="w-1/2">
          <img src={anime?.images?.jpg?.image_url} className="mx-auto" alt={anime?.title} />
        </div>
        <div className="p-4 grid grid-cols-1 gap-2">
          <div className="font-semibold text-gray-700">Rank: <span>{anime?.rank}</span></div>
          <div className="font-semibold text-gray-700">Popularity: <span>{anime?.popularity}</span></div>
          <div className="font-semibold text-gray-700">Score: <span>{anime?.score}</span></div>
          <div className="font-semibold text-gray-700">Members: <span>{anime?.members}</span></div>
          <div className="font-semibold text-gray-700">Source: <span>{anime?.source}</span></div>
          <div className="font-semibold text-gray-700">Duration: <span>{anime?.duration}</span></div>
          <div className="font-semibold text-gray-700">Status: <span>{anime?.status}</span></div>
          <div className="font-semibold text-gray-700">Rating: <span>{anime?.rating}</span></div>
        </div>
      </div>
      {characters?.length > 0 && (
        <div className="p-4">
          <h1 className="text-lg font-semibold mb-2">Characters</h1>
          <div className="flex flex-wrap">
            {characters?.map((item) => (
              <div className="flex-shrink-0 w-1/4 max-w-10 p-2" key={item.character.mal_id}>
                <span>{item.character.name}</span>
                <div>
                  <img className="w-32 h-40" src={item.character.images.jpg.image_url} alt={item.character.name} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    <div className="w-1/3"> {/* Tambahkan w-1/3 */}
      <Comments
        comments={animeComments}
        onAddComment={addComment}
        onEditComment={editComment}
        onDeleteComment={deleteComment}
      />
    </div>
  </div>
  );
}

export default AnimeDetail;

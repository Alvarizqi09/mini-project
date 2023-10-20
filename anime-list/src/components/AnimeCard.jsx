import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function AnimeCard({ anime, addToWatchlist, removeFromWatchlist, watchlist }) {
  const isOnWatchlist = watchlist.some((item) => item.mal_id === anime.mal_id);

  return (
    <article className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
      <img
        src={anime.images.jpg.large_image_url}
        alt="Anime"
        className="w-full h-48 object-cover"
      />
      <div className="px-6 py-4 flex-grow">
        <h3 className="text-xl font-semibold text-gray-800">{anime.title}</h3>
      </div>
      <div className="px-6 py-4 flex space-x-5 items-center">
        <Link to={`/anime/${anime.mal_id}`} className="text-gray-800 w-1/2 hover:text-black text-center">
          More Info
        </Link>
        {isOnWatchlist ? (
          <button
            onClick={() => removeFromWatchlist(anime)}
            className="bg-red-500 hover:bg-red-600 w-1/2 text-white font-bold px-2 py-2 rounded-full"
          >
            Remove
          </button>
        ) : (
          <button
            onClick={() => addToWatchlist(anime)}
            className="bg-blue-500 hover:bg-blue-600 w-1/2 text-white font-bold px-2 py-2 rounded-full "
          >
            Add list
          </button>
        )}
      </div>
    </article>
  );
}

AnimeCard.propTypes = {
  anime: PropTypes.shape({
    mal_id: PropTypes.number.isRequired,
    images: PropTypes.shape({
      jpg: PropTypes.shape({
        large_image_url: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  addToWatchlist: PropTypes.func.isRequired,
  removeFromWatchlist: PropTypes.func.isRequired,
  watchlist: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AnimeCard;

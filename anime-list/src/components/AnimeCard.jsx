import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function AnimeCard({ anime }) {
  return (
    <article className="anime-card w-full md:w-1/3 lg:w-1/4 px-4 mb-8">
      <Link to={`/anime/${anime.mal_id}`} className="no-underline text-gray-800 hover:text-black">
        <figure className="mb-4">
          <img
            src={anime.images.jpg.large_image_url}
            alt="Anime"
            className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-400"
          />
        </figure>
        <h3 className="text-gray-800 text-center">{anime.title}</h3>
      </Link>
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
};

export default AnimeCard;

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Sidebar({popularAnime }) {
  return (
    <div>
      <aside className="w-64 m-5">
        <nav>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Popular Anime</h3>
          <div>
            {popularAnime &&
              popularAnime.map((anime, index) => (
                <div className="flex items-center p-4 bg-white shadow-md rounded-lg mb-4" key={anime.mal_id}>
                  <span className="text-2xl text-gray-600">{index + 1}</span>
                  <Link to={`/anime/${anime.mal_id}`} className="flex items-center space-x-2">
                    <img src={anime.images.jpg.small_image_url} alt="popular" className="w-15 h-15 m-2 rounded-md" />
                    <span className="text-center text-gray-800">{anime.title}</span>
                  </Link>
                </div>
              ))}
          </div>
        </nav>
      </aside>
    </div>
  );
}

Sidebar.propTypes = {
  popularAnime: PropTypes.array,
};

export default Sidebar;

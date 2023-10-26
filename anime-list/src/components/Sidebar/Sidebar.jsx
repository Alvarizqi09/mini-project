import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Sidebar({ topAnime }) {
  return (
    <div>
      <aside className="w-full sm:w-64 m-5">
        <nav>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 sm:mt-8 mb-5 sm:mb-8">Top Anime</h3>
          <div>
            {topAnime &&
              topAnime.map((anime, index) => (
                <div className="flex flex-col sm:flex-row items-center p-2 sm:p-4 bg-white shadow-md rounded-lg mb-2 sm:mb-4" key={anime.mal_id}>
                  <span className="text-2xl sm:text-3xl text-gray-600">
                    {index + 1}
                  </span>
                  <Link to={`/anime/${anime.mal_id}`} className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <img src={anime.images.jpg.small_image_url} alt="top" className="w-12 h-12 sm:w-15 sm:h-15 m-1 sm:m-2 rounded-md" />
                    <span className="text-sm sm:text-base text-gray-800">{anime.title}</span>
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
  topAnime: PropTypes.array,
};

export default Sidebar;

import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function Sidebar({ topAnime }) {
  const navigate = useNavigate();
  return (
    <div>
      <aside className="w-full sm:w-64 m-5">
        <nav>
          <h3 className="text-xl sm:text-2xl text-center font-bold text-gray-800 sm:mt-14 mb-10 sm:mb-8">Top Anime</h3>
          <div className="flex flex-row sm:flex-col gap-x-5 overflow-x-auto">
            {topAnime &&
              topAnime.map((anime, index) => (
                <div className="flex flex-col sm:flex-row items-center p-2 sm:p-4 bg-white shadow-md rounded-lg mb-2 sm:mb-4" key={anime.mal_id} style={{ minWidth: '15rem' }}>
                  <span className="text-2xl sm:text-3xl text-gray-600">
                    {index + 1}
                  </span>
                  <div onClick={() => navigate(`/anime/${anime.mal_id}`)} style={{ cursor: 'pointer' }} className="flex items-center">
                    <img src={anime.images.jpg.small_image_url} alt="top" className="w-15 h-15 m-1 sm:m-2 rounded-md" />
                    <span className="text-sm sm:text-base text-center text-gray-800">{anime.title}</span>
                  </div>
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

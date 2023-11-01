import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function Sidebar({ topAnime }) {
  const navigate = useNavigate();
  return (
    <div>
      <aside className="w-full sm:w-64 m-5">
        <nav>
          <h3 className="text-xl sm:text-2xl text-center font-bold text-gray-800 sm:mt-14 mb-10 sm:mb-8">Top Anime</h3>
          <div className="flex flex-col gap-4">
            {topAnime &&
              topAnime.map((anime, index) => (
                <div className="flex flex-row items-center p-2 sm:p-4 bg-white shadow-md rounded-lg mb-2 sm:mb-4" key={anime.mal_id}>
                  <span className="text-2xl sm:text-3xl pr-5 text-gray-600">
                    {index + 1}
                  </span>
                  <div onClick={() => navigate(`/anime/${anime.mal_id}`)} style={{ cursor: 'pointer' }} className="flex items-center justify-center flex-1"> {/* Hapus class "w-full" */}
                    <span className="text-sm text-center text-gray-800">{anime.title}</span>
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

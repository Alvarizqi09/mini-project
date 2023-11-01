import { useSelector, useDispatch } from 'react-redux';
import { removeFromWatchlist } from './reducers/watchlistSlice';
import AnimeCard from '/src/components/AnimeCard';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

function Watchlist() {
  const watchlist = useSelector((state) => state.watchlist.watchlist);
  const dispatch = useDispatch();

  const handleRemoveFromWatchlist = (anime) => {
    dispatch(removeFromWatchlist(anime));
    toast.success(`${anime.title} has been removed from your watchlist.`, {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  return (
    <div className=" min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-8 flex-grow">
        <ToastContainer />
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Watch List</h3>
        {watchlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {watchlist.map((anime) => (
              <AnimeCard
                anime={anime}
                key={anime.mal_id}
                removeFromWatchlist={handleRemoveFromWatchlist}
                watchlist={watchlist}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Your watchlist is empty.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
Watchlist.propTypes = {
  removeFromWatchlist: PropTypes.func.isRequired,
};
export default Watchlist;

import Skeleton from '@mui/material/Skeleton';
import PropTypes from 'prop-types';

function LoadingCard() {
  return (
    <article className="bg-white shadow-lg rounded-lg overflow-hidden mb-8 flex flex-col">
      <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
        <Skeleton animation="wave" variant="circle" width={32} height={32} />
      </div>
      <div className="px-6 py-4 flex-grow">
        <Skeleton animation="wave" width="100%" height={24} /> {/* Perbaiki sintaks width */}
      </div>
      <div className="px-6 py-4 flex space-x-5 items-center">
        <div className="w-1/2">
          <Skeleton animation="wave" variant="rect" width={80} height={16} />
        </div>
        <div className="w-1/2">
          <Skeleton animation="wave" variant="rect" width={80} height={16} />
        </div>
      </div>
    </article>
  );
}

LoadingCard.propTypes = {
  anime: PropTypes.shape({
    mal_id: PropTypes.number.isRequired,
  }).isRequired,
};

export default LoadingCard;

import { BiLoaderCircle } from 'react-icons/bi'; 
import PropTypes from 'prop-types';

function LoadingCard() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <BiLoaderCircle className="text-gray-500 animate-spin" size={32} />
    </div>
  );
}

LoadingCard.propTypes = {
  anime: PropTypes.shape({
    mal_id: PropTypes.number.isRequired,
  }).isRequired,
};

export default LoadingCard;

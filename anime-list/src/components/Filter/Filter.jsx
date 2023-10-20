import './Filter.css';
import PropTypes from 'prop-types';

const Filter = ({ fetchFilter, filter, handleClose }) => {
  return (
    <button
      className="filter-button"
      onClick={() => {
        handleClose();
        fetchFilter(`${filter.name}`);
      }}
    >
      {filter.icon}
      {filter.name}
    </button>
  );
};

Filter.propTypes = {
  fetchFilter: PropTypes.func.isRequired,
  filter: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Filter;

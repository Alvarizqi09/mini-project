import { useState } from "react";
import PropTypes from 'prop-types';
import AnimeCard from "./AnimeCard";
import Filter from "./Filter/Filter";
import { Button, Menu, Fade } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useSelector, useDispatch } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../components/WatchList/reducers/watchlistSlice';
import LoadingCard from "./Loading/Loading";
import Swal from 'sweetalert2';


function MainContent(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const watchlist = useSelector((state) => state.watchlist.watchlist);
  const dispatch = useDispatch();

  const handleAddToWatchlist = (anime) => {
    dispatch(addToWatchlist(anime));
    Swal.fire({
      icon: 'success',
      title: 'Added to Watchlist',
      text: `${anime.title} has been added to your watchlist.`,
    });
  };
  
  const handleRemoveFromWatchlist = (anime) => {
    dispatch(removeFromWatchlist(anime));
    Swal.fire({
      icon: 'success',
      title: 'Removed from Watchlist',
      text: `${anime.title} has been removed from your watchlist.`,
    });
  };

  const fetchFilter = (name) => {
    props.handleFilter(name);
  };

  const filters = [
    { name: "Upcoming", icon: <CalendarMonthIcon /> },
    { name: "Favorite", icon: <StarIcon /> },
    { name: "Airing", icon: <LiveTvIcon /> },
  ];
  
  let title = "All Anime";
  if (props.activeFilter) {
    title = props.activeFilter;
  }

  return (
    <main>
      <div className=" flex justify-between items-center p-4">
        <h3 className="text-xl sm:text-2xl font-bold justify-center text-gray-800 sm:mt-12 mb-5 sm:mb-10 text-center">{title}</h3>
        <form className="search-box flex justify-end space-x-4 bg-white rounded-lg px-4 py-2 shadow-lg" onSubmit={props.handleSearch}>
          <Button
            className="bg-gray-800 text-white p-2 rounded-full focus:outline-none"
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            variant="contained"
          >
            <FilterAltIcon className="h-6 w-6" />
          </Button>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            {filters.map((filter) => {
              return (
                <Filter
                  fetchFilter={fetchFilter}
                  filter={filter}
                  handleClose={handleClose}
                  key={filter.name}
                />
              );
            })}
          </Menu>
          <input
            type="search"
            placeholder="Search for an anime"
            required
            value={props.search}
            onChange={(e) => props.setSearch(e.target.value)}
            className="py-2 px-3 w-full rounded-full border border-gray-300 focus:outline-none"
          />
        </form>
      </div>
      <div className="anime-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 mr-3">
        {props.animeList.length === 0 ? (
          <LoadingCard />
        ) : (
          props.animeList.map((anime) => (
            <AnimeCard
              anime={anime}
              key={anime.mal_id}
              addToWatchlist={handleAddToWatchlist}
              removeFromWatchlist={handleRemoveFromWatchlist}
              watchlist={watchlist}
            />
          ))
        )}
      </div>
    </main>
  );
}

MainContent.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  animeList: PropTypes.arrayOf(PropTypes.object).isRequired,
  watchlist: PropTypes.arrayOf(PropTypes.object).isRequired,
  addToWatchlist: PropTypes.func.isRequired,
  removeFromWatchlist: PropTypes.func.isRequired,
  activeFilter: PropTypes.string,
};

export default MainContent;

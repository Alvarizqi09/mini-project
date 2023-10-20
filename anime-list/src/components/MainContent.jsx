import { useState } from "react";
import PropTypes from 'prop-types';
import AnimeCard from "./AnimeCard";
import Filter from "./Filter/Filter";
import { Button, Menu, Fade } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function MainContent(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchFilter = (name) => {
    props.handleFilter(name);
  };

  const filters = [
    { name: "upcoming", icon: <CalendarMonthIcon /> },
    { name: "favorite", icon: <StarIcon /> },
    { name: "airing", icon: <LiveTvIcon /> },
  ];

  return (
    <main>
      <div className="main-head flex justify-end items-center p-4">
        <form className="search-box" onSubmit={props.handleSearch}>
          <Button
            className="bg-gray-800 text-white rounded-full p-4 focus:outline-none"
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            variant="contained"
          >
            Filter Anime
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
          />
        </form>
      </div>
      <div className="anime-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {props.animeList &&
          props.animeList.map((anime) => (
            <AnimeCard
              anime={anime}
              key={anime.mal_id}
              addToWatchlist={props.addToWatchlist}
              removeFromWatchlist={props.removeFromWatchlist}
              watchlist={props.watchlist}
            />
          ))
        }
      </div>
      {props.watchlist.length > 0 && (
        <div className="watchlist mt-8">
          <h2>Watchlist</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {props.watchlist.map((anime) => (
              <AnimeCard
                anime={anime}
                key={anime.mal_id}
                addToWatchlist={props.addToWatchlist}
                removeFromWatchlist={props.removeFromWatchlist}
                watchlist={props.watchlist}
              />
            ))}
          </div>
        </div>
      )}
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
};

export default MainContent;

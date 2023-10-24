import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import about from '../../assets/about.png';
import OutMobile from "../Login/OutMobile";

function Header() {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="py-1.5 font-medium"
      >
        <button
          className={`flex items-center text-white ${location.pathname === '/home' ? 'border-b-2' : ''}`}
          onClick={() => navigate("/home")}
        >
          Home
        </button>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="py-1.5 font-medium"
      >
        <button
          className={`flex items-center text-white ${location.pathname === '/listanime' ? 'border-b-2' : ''}`}
          onClick={() => navigate("/listanime")}
        >
          List Anime
        </button>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="py-1.5 font-medium"
      >
        <button
          className={`flex items-center text-white ${location.pathname === '/customerservices' ? 'border-b-2' : ''}`}
          onClick={() => navigate("/customerservices")}
        >
          Customer Services
        </button>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="py-1.5 font-medium"
      >
        <button
          className={`flex items-center text-white ${location.pathname === '/watchlist' ? 'border-b-2' : ''}`}
          onClick={() => navigate("/watchlist")}
        >
          Watch List
        </button>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="sticky top-0 bg-gray-950 z-10 h-max max-w-full rounded-none py-3 px-4 lg:px-8 lg:py-4 border-0">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex w-24 h-8 ml-10 items-center justify-start">
          <img src={about} alt="eventify" />
        </div>
        <div className="flex items-center justify-center ml-12 gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
        </div>
        <div className="flex items-center justify-end gap-4">
          <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block text-white"
          >
            <button
              onClick={() => navigate("/profile")}
            >
              My Profile
            </button>
          </Button>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active-bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        {navList}
        <OutMobile />
      </MobileNav>
    </Navbar>
  );
}

export default Header;

import { Typography } from "@material-tailwind/react";
import about from '../../assets/about.png';
import facebook from "/src/assets/facebook.png";
import github from "/src/assets/github.png";
import linkedin from "/src/assets/linkedin.png";
import instagram from "/src/assets/instagram.png";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const Footer = () => {
  return (
    <div className="bg-gray-900">
      <footer className="container mx-auto py-8">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="w-full lg:w-1/4 lg:text-center">
            <img src={about} alt="logo-ct" className="w-32 h-32 lg:w-48 lg:h-48 mx-auto mb-4" />
          </div>
          <div className="socialmedia flex justify-center mt-4 lg:mt-0 lg:space-x-2">
            <a href="https://www.facebook.com/faizada.alvarizqi/" title="facebook">
              <img src={facebook} alt="facebook" className="w-12 h-12 lg:w-20 lg:h-20" />
            </a>
            <a href="https://instagram.com/alvarizqi__" title="instagram">
              <img src={instagram} alt="instagram" className="w-12 h-12 lg:w-20 lg:h-20" />
            </a>
            <a href="https://linkedin.com/in/alvarizqi-7a2169223" title="linkedln">
              <img src={linkedin} alt="linkedln" className="w-12 h-12 lg:w-20 lg:h-20" />
            </a>
            <a href="https://github.com/Alvarizqi09" title="github">
              <img src={github} alt="github" className="w-12 h-12 lg:w-20 lg:h-20" />
            </a>
          </div>
          <div className="w-full lg:w-1/4 flex justify-center mt-4 lg:mt-0">
            <button className="flex items-center bg-blue-500 hover-bg-blue-600 text-white font-bold rounded-full py-2 px-4 space-x-2">
              Customer Services
              <SupportAgentIcon className="h-5 w-5 ml-4" />
            </button>
          </div>
        </div>
        <hr className="my-8 border-blue-gray-50" />
        <Typography color="blue-gray" className="text-center text-white font-normal">
          &copy; 2023 Alvarizqi. Vilume All Rights Reserved
        </Typography>
      </footer>
    </div>
  );
}

export default Footer;

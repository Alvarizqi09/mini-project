import { BiLoaderCircle } from 'react-icons/bi'; 

function LoadingCard() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <BiLoaderCircle className="text-gray-500 animate-spin flex items-center justify-center" size={32} />
    </div>
  );
}

export default LoadingCard;

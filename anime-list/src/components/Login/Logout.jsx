import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { googleLogout } from '@react-oauth/google';

const Logout = () => {
  const history = useNavigate();

  const handleGoogleLogout = () => {
    googleLogout();
    history('/');
  };

  return (
    <div>
      <Button
        variant="gradient"
        size="sm"
        onClick={handleGoogleLogout}
        className="hidden lg:inline-block text-white"
      >
        <span>Sign Out</span>
      </Button>
    </div>
  );
}

export default Logout;


import { signOut } from "firebase/auth"
import { database } from "./firebase";
import { useNavigate } from "react-router-dom"
import { Button } from "@material-tailwind/react";

const Logout = () => {
    const history = useNavigate()

    const handleClick = () => {
        signOut (database).then(val =>{
            console.log(val,"val")
            history ("/login")
        })
    }
  return (
    <div>
        <Button
              variant="gradient"
              size="sm"
              onClick={handleClick}
              className="hidden lg:inline-block text-white"
            >
              <span>Sign Out</span>
         </Button>
    </div>
  )
}

export default Logout
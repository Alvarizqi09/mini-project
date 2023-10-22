
import { signOut } from "firebase/auth"
import { database } from "./firebase";
import { useNavigate } from "react-router-dom"
import { Button } from "@material-tailwind/react";

const OutMobile = () => {
    const history = useNavigate()

    const handleClick = () =>{
        signOut(database).then(val=>{
            console.log(val,"val")
            history('/login')
        })
    }
  return (
    <div>
        <Button onClick={handleClick} variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Sign Out</span>
        </Button>
    </div>
  )
}

export default OutMobile
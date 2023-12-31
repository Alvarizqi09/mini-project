import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import logo from '../../assets/logo.png';
import { database } from "./firebase";
import "./Login.css";
import { useGoogleOneTapLogin } from '@react-oauth/google';

const Login = () => {

  const [login, setLogin] = useState(false);

  const navigate = useNavigate();

  useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      console.log(credentialResponse);
      navigate("/home")
    },
    onError: () => {
      console.log('Login Failed');
    },
  });

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (type == "signup") {
      createUserWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, "authData");
          navigate("/home");
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message,
          });
          setLogin(true);
        });
    } else {
      signInWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, "authData");
          navigate("/home");
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message,
          });
        });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center login-card">
    <div className="max-w-md w-full p-6 space-y-6 rounded-xl shadow-xl bg-white">
      <div className="flex mx-auto gap-x-5">
        <div
          className={login === false ? "activeColor" : "pointer"}
          onClick={() => setLogin(false)}
        >
          SignUp
        </div>
        <div
          className={login === true ? "activeColor" : "pointer"}
          onClick={() => setLogin(true)}
        >
          SignIn
        </div>
      </div>
      <img src={logo} alt="Logo" className="mx-auto h-20 w-20" />
      <h1 className="text-3xl font-extrabold text-gray-800 text-center">
        {login ? "SignIn" : "SignUp"}
      </h1>
      <form onSubmit={(e) => handleSubmit(e, login ? "signin" : "signup")} className="grid grid-cols-1 gap-y-5">
        <input
          name="email"
          type="email"
          className="block w-full p-2 border rounded-md"
          placeholder="Email"
        />
        <input
          name="password"
          type={login ? "password" : "password"}
          className="block w-full p-2 border rounded-md"
          placeholder="Password"
        />
        <button className="w-full bg-gradient-to-r from-blue-900 to-purple-900 text-white p-2 rounded-md" type="submit">
          {login ? "SignIn" : "SignUp"}
        </button>
      </form>
    </div>
  </div>
  )
}

export default Login
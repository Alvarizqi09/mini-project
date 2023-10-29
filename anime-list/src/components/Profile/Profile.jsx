import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Tooltip } from "@mui/material";
import Logout from "../Login/Logout";
import defaultAvatar from '../../assets/avatar.jpeg'; 
import "./Profile.css";
import OutMobile from '../Login/OutMobile';

const Profile = () => {
  
  const [userData, setUserData] = useState({
    avatar: defaultAvatar,
    fullName: '',
    username: '',
    birthdate: '',
    gender: '',
    city: '',
  });
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setUserData((prevData) => ({
          ...prevData,
          avatar: imageUrl,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem('userData', JSON.stringify(userData));
    setIsEditing(false);
  };

  const isMobile = window.innerWidth <= 960;

  const handleDelete = () => {
    localStorage.removeItem('userData');
    setUserData({
      avatar: defaultAvatar,
      fullName: '',
      username: '',
      birthdate: '',
      gender: '',
      city: '',
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen p-6 Profile">
      <div className="flex font-medium leading-6 mt-2 mb-2 ml-2 gap-4 items-center">
        <button onClick={() => navigate("/listanime")} className="flex items-center">
          <Tooltip title="Back">
            <ArrowBackIosIcon className="back-button text-white" />
          </Tooltip>
        </button>
        <h2 className="text-2xl font-semibold text-white">Your Profile</h2>
      </div>
      <div className="max-w-md bg-white rounded-lg p-4 shadow-lg mx-auto text-center">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Avatar</label>
          {isEditing ? (
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleImageChange}
              className="border rounded w-full p-2"
            />
          ) : (
            <div className="mb-2">
              <img src={userData.avatar} alt="Avatar" className="w-20 h-20 mx-auto rounded-full" />
            </div>
          )}
        </div>
        <div className="profile-info">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={userData.fullName}
                onChange={handleInputChange}
                className="border rounded w-full p-2"
              />
            ) : (
              <p className="text-lg font-semibold mb-2">{userData.fullName}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                className="border rounded w-full p-2"
              />
            ) : (
              <p className="text-lg font-semibold mb-2">@{userData.username}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Birthdate</label>
            {isEditing ? (
              <input
                type="date"
                name="birthdate"
                value={userData.birthdate}
                onChange={handleInputChange}
                className="border rounded w-full p-2"
              />
            ) : (
              <p className="text-lg font-semibold mb-2">{userData.birthdate}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
            {isEditing ? (
              <select
                name="gender"
                value={userData.gender}
                onChange={handleInputChange}
                className="border rounded w-full p-2"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <p className="text-lg font-semibold mb-2">{userData.gender}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
            {isEditing ? (
              <input
                type="text"
                name="city"
                value={userData.city}
                onChange={handleInputChange}
                className="border rounded w-full p-2"
              />
            ) : (
              <p className="text-lg font-semibold mb-2">{userData.city}</p>
            )}
          </div>
        </div>
        {isEditing ? (
          <button onClick={handleSave} className="bg-blue-500 text-white mb-4 p-2 rounded-md">
            Save
          </button>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="bg-blue-500 mb-4 w-full text-white p-2 rounded-md">
              Edit Profile
            </button>
            {isMobile ? (
              <div>
                <button onClick={handleDelete} className="bg-red-500 text-white mb-4 w-full p-2 rounded-md">
                  Delete Profile
                </button>
                <OutMobile />
              </div>
            ) : (
              <div>
                <button onClick={handleDelete} className="bg-red-500 w-full text-white mb-4 p-2 rounded-md">
                  Delete Profile
                </button>
                <Logout />
              </div>
            )}
            
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;

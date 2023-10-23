import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Tooltip } from "@mui/material";
import Logout from "../Login/Logout";

const Profile = () => {
    const [userData, setUserData] = useState({
        avatar: '', 
        fullName: '',
        username: '',
        birthdate: '',
        gender: '',
        city: '',
      });
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setUserData((prevData) => ({
            ...prevData,
            avatar: imageUrl,
          }));
        }
      };
    
      const [isEditing, setIsEditing] = useState(false);
    
      useEffect(() => {
        // Coba untuk mengambil data avatar dari localStorage
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
        // Simpan data avatar dan profil ke localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
        setIsEditing(false);
      };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
        <div className="flex font-medium leading-6 mt-2 mb-2 ml-2 gap-4 ">
            <NavLink to="/listanime">
                <Tooltip title="Back">
                    <ArrowBackIosIcon className="back-button text-black" />
                </Tooltip>
            </NavLink>
            <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
        </div>
      <div className="max-w-md bg-gray-200 rounded-lg p-4 shadow-lg mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Avatar:</label>
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
              <img src={userData.avatar} alt="Avatar" className="w-20 h-20 rounded-full" />
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Full Name:</label>
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
          <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
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
          <label className="block text-gray-700 text-sm font-bold mb-2">Birthdate:</label>
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
          <label className="block text-gray-700 text-sm font-bold mb-2">Gender:</label>
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
          <label className="block text-gray-700 text-sm font-bold mb-2">City:</label>
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
        {isEditing ? (
          <button onClick={handleSave} className="bg-blue-500 text-white mb-4 p-2 rounded-md">
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="bg-blue-500 mb-4 text-white p-2 rounded-md">
            Edit Profile
          </button>
        )}
        <div>
            <Logout/>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  signOutUserStart,
  deleteUserFailure,
  deleteUserSuccess,
} from '../redux/user/userSlice';

import { useNavigate } from "react-router-dom";
import {useRef} from 'react'


const Profile = () => {

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileref=useRef(null)

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());

      const res = await fetch('/api/auth/signout', {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess());
      navigate("/sign-in");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-10">

      {/* User Avatar */}
      <input type='file' ref={fileref} hidden accept='image/*'/>
      <img onClick={()=>fileref.current.click()}
        className="rounded-full w-50 h-50 object-cover shadow-lg"
        src={currentUser?.avatar || "/default-avatar.png"}
        alt="User Avatar"
      />
      

      {/* User Name */}
      <h1 className="text-2xl font-semibold text-gray-800 mt-4">
        {currentUser?.username || "Unknown User"}
      </h1>

      {/* Email */}
      <p className="text-gray-600 mt-1">
        {currentUser?.email}
      </p>

      {/* Details Card */}
      <div className="mt-6 bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-xl font-bold text-slate-700">Profile Details</h2>
        <hr className="my-3" />

        <p className="text-gray-700"><strong>Name:</strong> {currentUser?.username}</p>
        <p className="text-gray-700"><strong>Email:</strong> {currentUser?.email}</p>
      </div>

      {/* Sign Out Button */}
      <button
        onClick={handleSignOut}
        className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition"
      >
        Sign Out
      </button>

    </div>
  );
};

export default Profile;

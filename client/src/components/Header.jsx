import { FaSearch } from 'react-icons/fa';
import React from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setCurrentScreen } from 'firebase/analytics';

const Header = () => {
  const {currentUser}=useSelector(state=>state.user)//get the current user details
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to='/'>
        <h1 className="font-bold text-sm sm:text-xl flex-wrap">
          <span className="text-slate-500">Danushka</span>
          <span className="text-slate-700">Estate</span>
        </h1>
        </Link>
        

        <form className="bg-slate-100 p-3 rounded-lg flex items-center w-23 sm:w-57">
          <input 
            type="text" 
            className="bg-transparent outline-none focus:outline-none"
            placeholder="  Search...    "
          />
          <FaSearch className="text-slate-600"/>
        </form>
        <ul className="flex gap-20">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">Home</li>
          </Link>
          <Link to="/About">
          <li className="hidden sm:inline text-slate-700 hover:underline">About</li>
          </Link>
          {currentUser ? (
            <Link to="/profile">
              <h1>{currentUser.username}</h1>
            </Link>
          ):
          <h1></h1>
          }
          {currentUser ? (
            <Link to="/profile">
              <img className="rounded-full h-8 w-8" src={currentUser.avatar} alt={currentUser.username}/>
            </Link>
          ):
          <Link to="/sign-in">
            <li className="sm:inline text-slate-700 hover:underline">Sign In</li>
          </Link>
          }
          
        </ul>

      </div>
    </header>
  );
};

export default Header;

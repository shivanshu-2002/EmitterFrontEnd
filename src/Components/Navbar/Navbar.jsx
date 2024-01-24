// Navbar.js
import { CgProfile } from "react-icons/cg";
import React, { useContext } from 'react';
import logo from '../../assets/ideas.png'
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../utils/Context";
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate=  useNavigate();
  const {isLoggedIn,user,setUser,setIsLoggedIn} = useContext(DataContext)
  console.log(isLoggedIn)
  const handleLogOut = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
  
    if (confirmLogout) {
      // Log out the user
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
  
      // Display a confirmation toast
      toast.success("Successfully Logged Out");
  
      // Redirect to the home page
      navigate("/");
    }
  };
  return (
    <nav className="bg-gray-800  p-4 ">
    <div className="w-[80%] mx-auto flex items-center justify-between">
    
        <img src={logo} alt="logo" onClick={()=>{navigate('/')}} className="w-[70px] animate-pulse h-[70px]"/>

      <div className="flex justify-center  gap-3 text-white items-center text-2xl ">
       {
        isLoggedIn ?   <div className="flex flex-row gap-2 items-center justify-center">Hello! {user.username  } <CgProfile size={30} className="hover:text-gray-600 cursor-pointer" onClick={()=>{navigate('/profile')}}/> <div className="hover:text-gray-500 cursor-pointer" onClick={handleLogOut}>Logout</div></div>: 
        <div className="flex flex-row  text-white">
              <div className="text-xl p-3 cursor-pointer  hover:text-gray-500" onClick={()=>{navigate('/login')}}>Login</div>
              <div className="text-xl p-3 cursor-pointer hover:text-gray-500" onClick={()=>{navigate('/create-account')}}>Signup</div>
        </div>
       }

      </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";

//creating our nav bar
const NavBar = () => {
  //navigate to login / create acoount section by click the button
  const navigate = useNavigate();

  //after login showing the profile picture & dropdown menu
  const [showMenu, setShowMenu] = useState(false);
  //token = true -> logged in, token = false -> logged out
  const [token, setToken] = useState(true);
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 bg-white shadow-md">
      <img onClick={()=>navigate('/')} className="w-44 cursor-pointer" src={assets.logo} alt="" />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/" className="relative group">
          <li className="py-1 hover:text-primary">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </NavLink>
        <NavLink to="/doctors" className="relative group">
          <li className="py-1 hover:text-primary">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </NavLink>
        <NavLink to="/about" className="relative group">
          <li className="py-1 hover:text-primary">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </NavLink>
        <NavLink to="/contact" className="relative group">
          <li className="py-1 hover:text-primary">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {//if logged in then show profile else button
        token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-48 bg-stone-100 rounded-lg shadow-lg flex flex-col gap-4 p-4">
                    <p onClick={()=>navigate('my-profile')} className="hover:text-black cursor-pointer">My Profile</p>
                    <p onClick={()=>navigate('my-appointments')} className="hover:text-black cursor-pointer">My Appointments</p>
                    <p onClick={()=>setToken(false)} className="hover:text-black cursor-pointer">Logout</p>
                </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary outline-none text-white px-8 py-3 rounded-full font-light hidden md:block shadow-md hover:bg-primary-dark transition-all duration-300"
          >
            Create Account
          </button>
        )}
        <img onClick={()=>setShowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="" />
        {/* mobile menu */}
        <div className={`${showMenu ? 'fixed w-full h-full bg-opacity-75' : 'h-0 w-0'} bg-black md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden transition-all`}>
          <div className="flex items-center justify-between px-5 py-6 bg-white shadow-lg">
            <img className="w-36" src={assets.logo} alt="" />
            <img className="w-7 cursor-pointer" onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium bg-white shadow-lg">
            <NavLink onClick={()=>setShowMenu(false)} to='/' className="w-full text-center py-4 hover:bg-gray-100">HOME</NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/doctors' className="w-full text-center py-4 hover:bg-gray-100">ALL DOCTORS</NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/about' className="w-full text-center py-4 hover:bg-gray-100">ABOUT</NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/contact' className="w-full text-center py-4 hover:bg-gray-100">CONTACT</NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
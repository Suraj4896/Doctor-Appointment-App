import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const SideBar = () => {

    //grab the token
    const { aToken } = useContext(AdminContext);

    //if token available then show all options
    return (
        <div className='min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 border-r shadow-lg'>
            {
                //assign all navigations
                aToken && <ul className='text-gray-700 mt-5'>
                    <NavItem to={'/admin-dashboard'} icon={assets.home_icon} label="Dashboard" />
                    <NavItem to={'/all-appointments'} icon={assets.appointment_icon} label="Appointments" />
                    <NavItem to={'/add-doctor'} icon={assets.add_icon} label="Add Doctor" />
                    <NavItem to={'/doctor-list'} icon={assets.people_icon} label="Doctors List" />
                </ul>
            }
        </div>
    )
}

const NavItem = ({ to, icon, label }) => {
    return (
        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-200 text-indigo-800 border-r-4 border-indigo-600' : 'hover:bg-indigo-100 hover:text-indigo-700'}`} to={to}>
            <img className='w-6 h-6' src={icon} alt="" />
            <p>{label}</p>
        </NavLink>
    )
}

export default SideBar
import React, { useContext } from 'react'
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const { aToken, setAToken } = useContext(AdminContext);
    const navigate = useNavigate();

    // logout function
    const logOut = () => {
        navigate('/');
        aToken && setAToken('');
        aToken && localStorage.removeItem('aToken');
    }

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-gradient-to-r from-indigo-50 to-indigo-100 shadow-md'>
            <div className='flex items-center gap-2 text-xs'>
                <img className='w-36 sm:w-40 cursor-pointer hover:opacity-80 transition-opacity' src={assets.admin_logo} alt="" />
                <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 bg-white shadow-sm'>{aToken ? 'Admin' : 'Doctor'}</p>
            </div>
            <button onClick={logOut} className='bg-primary text-white text-sm px-10 py-2 rounded-full hover:bg-primary-dark transition-all transform hover:scale-105 shadow-md'>Logout</button>
        </div>
    )
}

export default Navbar
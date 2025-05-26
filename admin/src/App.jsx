import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import { Route, Routes } from 'react-router-dom';
import DashBoard from './pages/Admin/DashBoard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {

  //grab the token to show the login page on the basis of token present or not
  const {aToken} = useContext(AdminContext);
  const {dToken} = useContext(DoctorContext);

  //if admin have already logged in that means the token is stored
  //in localstorage so the login page must be hidden
  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
        <ToastContainer />
        <Navbar />
        <div className='flex items-start'>
          <SideBar />
          <Routes>
            {/* Admin routes */}
            <Route path='/' element={<></>} />
            <Route path='/admin-dashboard' element={<DashBoard />} />
            <Route path='/all-appointments' element={<AllAppointments />} />
            <Route path='/add-doctor' element={<AddDoctor />} />
            <Route path='/doctor-list' element={<DoctorsList />} />

            {/* Doctor routes */}
            <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
            <Route path='/doctor-appointments' element={<DoctorAppointments />} />
            <Route path='/doctor-profile' element={<DoctorProfile />} />
          </Routes>
        </div>
    </div>
  ) : (
    <>
      <Login/>
      <ToastContainer />
    </>
  )
}

export default App
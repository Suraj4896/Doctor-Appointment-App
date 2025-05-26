import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

//context about doctor to access in any component
const DoctorContextProvider = (props) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  //state for doctor authentication
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  //state for appointments
  const [appointments, setAppointments] = useState([]);
  //state for doctor dashboard
  const [dashData, setDashData] = useState(false);
  //state for profile
  const [profileData, setProfileData] = useState(false);

  //function for get all appointments of the doctor
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendURL + "/api/doctor/appointments",
        {
          headers: { dToken },
        }
      );
      if (data.success) {
        setAppointments(data.appointments.reverse());
        
      } else {
        toast.error(data.message);
        console.log(data.message);
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //function for marking all appointments complete
  const completeAppointment = async (appointmentId) => {
    try {
      const {data} = await axios.post(backendURL + '/api/doctor/complete-appointment', {appointmentId}, {headers: {dToken}});
      if(data.success){
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  //function for cancel  appointments 
  const cancelAppointment = async (appointmentId) => {
    try {
      const {data} = await axios.post(backendURL + '/api/doctor/cancel-appointment', {appointmentId}, {headers: {dToken}});
      if(data.success){
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  //function for dashboard
  const getDashData = async () => {
    try {
      const {data} = await axios.get(backendURL + '/api/doctor/dashboard', {headers: {dToken}});
      if(data.success){
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  //function for profile data
  const getProfileData = async () => {
    try {
      const {data} = await axios.get(backendURL + '/api/doctor/profile', {headers: {dToken}});
      if(data.success){
        setProfileData(data.profileData);
      }
      
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
  }

  const value = {
    dToken,
    setDToken,
    backendURL,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,
    setDashData,
    getDashData,
    profileData,
    setProfileData,
    getProfileData
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;

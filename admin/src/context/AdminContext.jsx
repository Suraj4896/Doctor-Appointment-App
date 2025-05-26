import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

//context about admin to access in any component
const AdminContextProvider = (props) => {
  //state for storing the token
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  //state for doctors from database
  const [doctors, setDoctors] = useState([]);
  //state for appointments
  const [appointments, setAppointments] = useState([]);
  //state for dashboard content
  const [dashboard, setDashboard] = useState();
  //grab backend url from env
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  //function for accessing all doctors from database using api call
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //function for chnage availability of doctors from database
  const chnageAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        //update the data
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //function for showing all appointments
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
        headers: { aToken },
      });
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //function for cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
        const {data} = await axios.post(backendUrl+'/api/admin/cancel-appointments', {appointmentId}, {headers: {aToken}});
        if(data.success){
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
        getAppointments();
    } catch (error) {
        toast.error(error.message);
    }
  }

  //function for getting dashboard data
  const getDashData = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/admin/dashboard', {headers: {aToken}});
      if(data.success){
        setDashboard(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const value = {
    aToken,
    setAToken,
    backendUrl,
    getAllDoctors,
    doctors,
    setDoctors,
    chnageAvailability,
    appointments,
    setAppointments,
    getAppointments,
    cancelAppointment,
    dashboard,
    getDashData,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;

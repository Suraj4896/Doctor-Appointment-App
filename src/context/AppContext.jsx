import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';

//create a context
export const AppContext = createContext();

//context provider function
const AppContextProvider = (props) => {

    //currency symbol
    const currencySymbol = '$';

    //backend
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    //state 
    const [doctors, setDoctors] = useState([]);

    //state for user authentication token
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    
    const [userData, setUserData] = useState(false);




    const getDoctorsData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/list');
            if(data.success){
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const loadUserProfileData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/user/get-profile', {headers: {token}});
            if(data.success){
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(()=> {
        getDoctorsData();
    }, [])

    useEffect(()=> {
        if(token){
            loadUserProfileData();
        } else {
            setUserData(false);
        }
    }, [token])

    const value = {
        doctors, currencySymbol, 
        getDoctorsData, token, setToken, backendUrl,
        userData, setUserData, loadUserProfileData
    }

    

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
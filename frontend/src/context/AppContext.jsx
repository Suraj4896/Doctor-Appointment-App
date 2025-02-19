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

    useEffect(()=> {
        getDoctorsData();
    }, [])

    const value = {
        doctors, currencySymbol, getDoctorsData
    }

    

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
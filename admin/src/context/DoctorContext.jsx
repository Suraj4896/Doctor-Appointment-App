import { createContext } from "react";

export const DoctorContext = createContext();

//context about doctor to access in any component
const DoctorContextProvider = (props) => {
    const value = {

    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;
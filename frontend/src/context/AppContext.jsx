import { createContext } from 'react';
import { doctors } from "../assets/assets";

//create a context
export const AppContext = createContext();

//context provider function
const AppContextProvider = (props) => {

    //currency symbol
    const currencySymbol = '$';

    const value = {
        doctors, currencySymbol
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
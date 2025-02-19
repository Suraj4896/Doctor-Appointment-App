import { createContext } from "react";

export const AppContext = createContext();

//context to access in any component
const AppContextProvider = (props) => {
    const value = {

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
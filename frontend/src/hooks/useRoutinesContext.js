import { RoutinesContext } from "../context/RoutinesContext";
import { useContext } from "react";


export const useRoutinesContext = () => {
    const context = useContext(RoutinesContext)

    if (!context)  {
        throw(Error('routinesContext must be used inside routinesContextProvider'))
    }

    return context
}
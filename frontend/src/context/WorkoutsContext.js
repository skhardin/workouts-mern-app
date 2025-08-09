import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload,
                routines: state.routines
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts],
                routines: state.routines

            }
        case 'PATCH_WORKOUT': 
            return {
                workouts: state.workouts.map((w) => {
                   return w._id == action.payload._id ? action.payload : w
                }),
                routines: state.routines
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w) => w._id != action.payload._id),
                routines: state.routines
            }
        case 'SET_ROUTINES':
            return {
                routines: action.payload,
                workouts: state.workouts
            }
        case 'CREATE_ROUTINE':
            return {
                routines: [action.payload, ...state.routines],
                workouts: state.workouts
            }
    // case 'PATCH_ROUTINE': 
    //   return {
    //     routines: state.routines.map((r) => {
    //       return r._id === action.payload._id ? action.payload : r
    //     })
    //   }
        case 'DELETE_ROUTINE':
            return {
                routines: state.routines.filter((r) => r._id !== action.payload._id),
                workouts: state.workouts
            }
        default:
            return state
    }
}

export const WorkoutsContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null,
        routines: null
    })

    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}
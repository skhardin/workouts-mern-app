import { useEffect } from 'react' 
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

import RoutineCard from '../components/RoutineCard'
import RoutineForm from '../components/RoutineForm'

const Routines = () => {
    const { workouts, routines, dispatch } = useWorkoutsContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }  
        fetchWorkouts() 
     }, [])

     useEffect(() => {
        const fetchRoutines = async () => {
            const response = await fetch('/api/routines')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_ROUTINES', payload: json})
            }
        }  
        fetchRoutines() 
     }, [])


    return (
      <div className="home">
        <div className="routines">
            {routines && routines.map(routine => (
                <RoutineCard key={routine._id} routine={routine} />
            ))} 
        </div>
        <RoutineForm />
      </div>
    )
}

export default Routines
import { useEffect } from 'react' 
import { useRoutinesContext } from '../hooks/useRoutinesContext'

import RoutineCard from '../components/RoutineCard'
import RoutineForm from '../components/RoutineForm'

const Routines = () => {
    const { routines, dispatch } = useRoutinesContext()

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
        {/* <button className="add-routine" onClick={() => window.location.href = '/routine/new'}/> */}
        <RoutineForm />
      </div>
    )
}

export default Routines
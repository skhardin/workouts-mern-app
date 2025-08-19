import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'


const RoutineCard = ({ routine }) => {
    const { workouts, routines, dispatch } = useWorkoutsContext()
    const [error, setError] = useState(null)
    const selectedWorkouts = routine.workoutIds.map(id => workouts.find(workout => workout._id === id))

    // const handleUpdate = async (e) => {
    //     e.preventDefault()

    //     const updatedRoutine = { title, description }

    //     const response = await fetch('/api/routines/' + routine._id, {
    //         method: 'PATCH',
    //         body: JSON.stringify(updatedRoutine),
    //         headers: { 'Content-Type': 'application/json' }
    //     })

    //     const json = await response.json()

    //     if (!response.ok) {
    //         setError(json.error)
    //     }
    //     if (response.ok) {
    //         setError(null)
    //         console.log('Routine updated: ', json)
    //         dispatch({ type: 'PATCH_ROUTINE', payload: json })
    //         setEditMode(false)
    //     }
    // }

    const handleDelete = async () => {
        const response = await fetch('/api/routines/' + routine._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_ROUTINE', payload: json })
        }
    }

    return (
        <div className="routine-card">
                <div>
                    <h3>{routine.title}</h3>
                    <p>Duration: {routine.duration} minutes</p>
                    <details>
                        <summary>Workouts</summary>
                        <ul>
                            {selectedWorkouts.map(workout => (  
                                <li key={workout._id}>
                                    <strong>{workout.title}</strong>
                                </li>
                            ))}
                        </ul>
                    </details>
                    <div>
                        {routine.labels && routine.labels.map((label) => (
                            <span key={label} className="label">{label}</span>))}
                    </div>
                </div>
                {/* <a href={`/routine/${routine._id}`}>Go To Routine</a> */}
                <button className="material-symbols-outlined" onClick={handleDelete}>delete</button>
        </div>
    )
}

export default RoutineCard
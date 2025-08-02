import { useState } from 'react'
import { useRoutinesContext } from '../hooks/useRoutinesContext'


const RoutineCard = ({ routine }) => {
    const { routines, dispatch } = useRoutinesContext()
    const [error, setError] = useState(null)

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
                        <ul>
                            {routine.workouts.map((workout, index) => (
                                <li key={index}>
                                    {workout.title} - {workout.load}kg, {workout.reps} reps
                                </li>
                            ))} 
                        </ul>
                    </details>
                    <div>
                        {routine.labels && routine.labels.map((label) => (
                            <span key={label} className="label">{label}</span>))}
                    </div>
                </div>
                <a href={`/routine/${routine._id}`}>Go To Routine</a>
                <button className="delete" onClick={handleDelete}>Delete Routine</button>
        </div>
    )
}

export default RoutineCard
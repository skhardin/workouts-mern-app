import { useState, dispatch } from 'react'
import { useRoutinesContext } from '../hooks/useRoutinesContext'

import WorkoutDetails from '../components/WorkoutDetails'


const RoutineDetails = ({ routine }) => {
    const { routines, dispatch } = useRoutinesContext()
    const [title, setTitle] = useState(routine.title || '')
    const [workouts, setWorkouts] = useState(routine.workouts || [])
    const [duration, setDuration] = useState(routine.duration || 0)
    const [labels, setLabels] = useState(routine.labels || [])
    const [error, setError] = useState(null)
    const [editMode, setEditMode] = useState(false)

    const handleUpdate = async (e) => {
        e.preventDefault()

        const updatedRoutine = { title, workouts, duration, labels }

        const response = await fetch('/api/routines/' + routine._id, {
            method: 'PATCH',
            body: JSON.stringify(updatedRoutine),
            headers: { 'Content-Type': 'application/json' }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setError(null)
            console.log('Routine updated: ', json)
            dispatch({ type: 'PATCH_ROUTINE', payload: json })
        }
    }

    return (
        editMode ? (
            <div className="routine-details"> 
            </div>
        ) : (
            <div className="routine-details">
                <h3>{routine.title}</h3>
                <p>Duration: {routine.duration} minutes</p>
                {workouts && workouts.map(workout => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
                <div>
                    {routine.labels && routine.labels.map((label) => (
                        <span key={label} className="label">{label}</span>))}
                </div>

                {error && <div className="error">{error}</div>}
            </div>
        )
    )
}

export default RoutineDetails
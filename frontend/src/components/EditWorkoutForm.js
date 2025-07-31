import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const EditWorkoutForm = ({workout, editMode, setEditMode}) => {
    const {workouts, dispatch} = useWorkoutsContext()
    const title = workout.title
    const [load, setLoad] = useState(workout.load || '')
    const [reps, setReps] = useState(workout.reps || '')
    const [error, setError] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()

        const newWorkout = {title, load, reps}

        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'PATCH',
            body: JSON.stringify(newWorkout),
            headers: {'Content-Type': 'application/json'}
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setError(null)
            console.log('Workout updated: ', json)
            setEditMode(false)
            dispatch({type: 'PATCH_WORKOUT', payload: json})
        }
    }
    return (
        <form className="update" onSubmit={handleSubmit}>
            <h3>Edit workout</h3>
            <p>{workout.title}</p>
            <label>Load (kg)</label>
            <input 
                type="number"
                onChange={(e) => {setLoad(e.target.value)}}
                value={load}
                className={load.length < 1 ? 'error' : ''}
            />
             <label>Reps</label>
            <input 
                type="number"
                onChange={(e) => {setReps(e.target.value)}}
                value={reps}
                className={load.length < 1 ? 'error': ''}
            />

            <button>Edit workout</button>
            {error && <div className="error">{error}</div>}

        </form>
    )
}

export default EditWorkoutForm
import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutDetails = ({workout}) => {

    const {workouts, dispatch} = useWorkoutsContext()
    const [editMode, setEditMode] = useState(false)
    const title = workout.title
    const [load, setLoad] = useState(workout.load || '')
    const [reps, setReps] = useState(workout.reps || '')
    const [error, setError] = useState(null)


    const handleUpdate = async (e) => {
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
            dispatch({type: 'PATCH_WORKOUT', payload: json})
            setEditMode(false)
        }
    }

    const handleDelete = async (e) => {
        
        const response = await fetch('/api/workouts/' + workout._id, { 
            method: 'DELETE'        
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    return (
        <div className="workout-details">
        { editMode ? (
             <form className="update" onSubmit={handleUpdate}>
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
            :
       (
        <div>
            <h2>{workout.title}</h2>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
            <div className="workout-actions">
                <button className="material-symbols-outlined" onClick={() => setEditMode(true)}>edit</button>
                    
                <button className="material-symbols-outlined" onClick={handleDelete}>delete</button>
            </div>      
        </div>
       )
        }
        </div> 
    )
}

export default WorkoutDetails
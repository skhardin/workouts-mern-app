import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import EditWorkoutForm from "./EditWorkoutForm"

const WorkoutDetails = ({workout}) => {

    const {workouts, dispatch} = useWorkoutsContext()
    const [editMode, setEditMode] = useState(false)

    const handleUpdate = async (e) => {

        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'PATCH',
        })}

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
            <EditWorkoutForm
                workout={workout}
                editMode={editMode}
                setEditMode={setEditMode}
                />
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
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutDetails = ({workout}) => {
    const {workouts, dispatch} = useWorkoutsContext()

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
        <h2>{workout.title}</h2>
        <p><strong>Load (kg): </strong>{workout.load}</p>
        <p><strong>Reps: </strong>{workout.reps}</p>
        <p>{workout.createdAt}</p>
        <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
       </div> 
    )
}

export default WorkoutDetails
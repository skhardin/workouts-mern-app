import { useState } from 'react'
import { useRoutinesContext } from '../hooks/useRoutinesContext'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const RoutineForm = () => {
    const {routines, routinesDispatch} = useRoutinesContext()
    const {workouts, workoutsDispatch} = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [duration, setDuration] = useState('')
    const [workoutIds, setWorkoutIds] = useState([])
    const [labels, setLabels] = useState([])
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const routine = {title, duration, workoutIds, labels}

        const response = await fetch('/api/routines', {
            method: 'POST',
            body: JSON.stringify(routine),
            headers: {'Content-Type': 'application/json'}
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setError(null)
            setTitle('')
            setDuration('')
            setLabels('')
            setEmptyFields([])
            console.log('New routine added: ', json)
            routinesDispatch({type: 'CREATE_ROUTINE', payload: json})
        }
    }
    return (<div>
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new routine</h3>
            <label>Routine Title</label>
            <input 
                type="text"
                onChange={(e) => {setTitle(e.target.value)}}
                value={title}
                className={emptyFields.includes('title') ? 'error': ''}
            />
             <label>Duration (mins)</label>
            <input 
                type="number"
                onChange={(e) => {setDuration(e.target.value)}}
                value={duration}
                className={emptyFields.includes('duration') ? 'error' : ''}
            />
             <label>Labels</label>
            <input 
                type="text"
                onChange={(e) => {setLabels(e.target.value)}}
                value={labels}
                className={emptyFields.includes('labels') ? 'error': ''}
            />
            <label>Workouts</label>
            <select multiple
                onChange={(e) => {
                    const selectedWorkoutIds = Array.from(e.target.selectedOptions, option => option.value)
                    setWorkoutIds(selectedWorkoutIds)
                }}
                className={emptyFields.includes('workoutIds') ? 'error': ''}
                >
                {workouts && workouts.map((workout) => (
                    <option 
                        key={workout._id} 
                        value={workout._id} >
                        {workout.title}
                        </option>
                ))}
            </select>

            <button>Add routine</button>
            {error && <div className="error">{error}</div>}

        </form>
        <ul>
        {workouts && workouts.map((workout) => (
            <li key={workout._id}>
                {workout.title} - {workout.load}kg x {workout.reps  }
            </li>
        ))}
        </ul>
        </div>
    )
}

export default RoutineForm
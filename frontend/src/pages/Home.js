import { useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

import WorkoutDetails from '../components/WorkoutDetails'
import AddWorkoutForm from '../components/AddWorkoutForm'



const Home = () => {

    // const [workouts, setWorkouts] = useState(null) <---- without react context
    const { workouts, dispatch } = useWorkoutsContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if (response.ok) {
                // setWorkouts(json) <---- without react context
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }  
        fetchWorkouts() 
     }, [])

    return (
      <div className="home">
        <div className="workouts">
            {workouts && workouts.map(workout => (
                <WorkoutDetails key={workout._id} workout={workout} />
            ))}
        </div>
        <AddWorkoutForm />
      </div>
    )
  }
  
  export default Home
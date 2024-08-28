const express = require('express')
const { createWorkout, findWorkoutById, findAllWorkouts, deleteWorkout, updateWorkout } = require('../controllers/workoutController')

const router = express.Router()

// GET all workouts
router.get('/', findAllWorkouts)

// GET a workout by id
router.get('/:id', findWorkoutById)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout by id
router.delete('/:id', deleteWorkout)

router.patch('/:id', updateWorkout)

module.exports = router
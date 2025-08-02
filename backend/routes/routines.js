const express = require('express')
// const { createRoutine, findRoutineById, findAllRoutines, deleteRoutine, updateRoutine } = require('../controllers/routineController')
const { createRoutine, findRoutineById, findAllRoutines } = require('../controllers/routineController')


const router = express.Router()

// GET all Routines
router.get('/', findAllRoutines)

// GET a Routine by id
router.get('/:id', findRoutineById)

// POST a new Routine
router.post('/', createRoutine)

// DELETE a Routine by id
// router.delete('/:id', deleteRoutine)

// // PATCH a Routine by id
// router.patch('/:id', updateRoutine)

module.exports = router
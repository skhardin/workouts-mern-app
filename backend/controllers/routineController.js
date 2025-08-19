const Routine = require('../models/routineModel')
const mongoose = require('mongoose')

const createRoutine = async (req, res) => {
    const { title, duration, workoutIds, labels } = req.body
    console.log("createRoutine", req.body)
    let emptyFields = []

    if (!title) { emptyFields.push('title') }
    if (!workoutIds || workoutIds.length === 0) { emptyFields.push('workoutIds') }
    if (duration === undefined) { emptyFields.push('duration') }
    console.log("emptyFields", emptyFields)

    if(emptyFields.length > 0) { return res.status(400).json({error: 'All fields must be non-empty.', emptyFields})}

    try {
        const routine = await Routine.create({ title, duration, workoutIds, labels })
        res.status(201).json(routine)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const findAllRoutines = async (req, res) => {
    const routines = await Routine.find({}).sort({createdAt: -1})
    res.status(200).json(routines)
}

const findRoutineById = async (req, res) => {
    const { id } = req.params   
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Bad request - invalid id'})
    }
    const routine = await Routine.findById(id)  
    if (!routine) return res.status(404).json('Routine not found')

    res.status(200).json(routine)
}

const deleteRoutine = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Bad request - invalid id'})
    }

    const routine = await Routine.findOneAndDelete({_id: id})

    if (!routine) return res.status(404).json('Routine not found')

    res.status(200).json(routine)
}

module.exports = { 
    createRoutine, findAllRoutines, findRoutineById, deleteRoutine
}
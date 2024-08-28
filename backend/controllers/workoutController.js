const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body
    
    let emptyFields = []

    if (!title) { emptyFields.push('title') }
    if (!reps) { emptyFields.push('reps') }
    if (!load) { emptyFields.push('load') }

    if(emptyFields.length > 0) { return res.status(400).json({error: 'All fields must be non-empty.', emptyFields})}


    try {
        const workout = await Workout.create({title, reps, load})
        res.status(201).json(workout)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const findAllWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

const findWorkoutById = async (req, res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Bad request - invalid id'})
    }

    const workout = await Workout.findById(id)

    if (!workout) return res.status(404).json('Workout not found')
        
    res.status(200).json(workout)
}

const deleteWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Bad request - invalid id'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) return res.status(404).json('Workout not found')

    res.status(204).json(workout)
}

const updateWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Bad request - invalid id'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, { ...req.body })

    if (!workout) return res.status(404).json('Workout not found')

    res.status(200).json(workout)
}

module.exports = {
    createWorkout, findWorkoutById, findAllWorkouts, deleteWorkout, updateWorkout
}
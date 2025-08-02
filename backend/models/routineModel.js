const mongoose = require('mongoose')
const {Workout, WorkoutSchema} = require('../models/workoutModel')

const Schema = mongoose.Schema

const routineSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    workouts: {
        type: [WorkoutSchema],
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    labels: {
        type: [String],
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Routine', routineSchema)
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const routineSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    workoutIds: {
        type: [Schema.Types.ObjectId],
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
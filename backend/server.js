require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRouter = require('./routes/workouts')

const app = express()

// middleware
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Listening on port ', process.env.PORT)
        })
    })
    .catch((err) => console.log(err))

app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})

app.use('/api/workouts', workoutRouter)



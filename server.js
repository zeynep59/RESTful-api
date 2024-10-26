const express = require('express')
const mongoose = require('mongoose')
const authorsRoutes = require('./src/routes/authorsRoute')
const booksRoutes = require('./src/routes/booksRoute')
const app = express()

app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/bookStore')

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected')
    app.listen(5000, () => console.log('Server started on port 5000'))
})

mongoose.connection.on('error', (error) => {
    console.log('Mongoose connection error: ', error)
})

app.use('/books', booksRoutes )
app.use('/authors', authorsRoutes)
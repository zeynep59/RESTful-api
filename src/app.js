const express = require('express')
const mongoose = require('mongoose')
const config = require('../config.js')

const authorsRoutes = require('./routes/authorsRoute')
const booksRoutes = require('./routes/booksRoute')

const app = express()
app.use(express.json())

mongoose.connect(config.db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected')
    app.listen(5000, () => console.log('Server started on port 5000'))
})

mongoose.connection.on('error', (error) => {
    console.log('Mongoose connection error: ', error)
})

app.use('/books', booksRoutes )
app.use('/authors', authorsRoutes)

module.exports = app;

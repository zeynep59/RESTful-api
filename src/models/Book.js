const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: true
    },
    price:{
        type: Number,
    },
    ISBN:{
        type: String,
    },
    language:{
        type: String,
    },
    numberOfPages:{
        type: Number,
    },
    publisher:{
        type: String,
    }
})
module.exports = mongoose.model('Book', bookSchema)
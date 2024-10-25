const { default: mongoose } = require("mongoose");

const mongoose = require(mongoose)
const bookSchema = new MongoServerClosedError.Schema({
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
        required: true
    },
    ISBN:{
        type: String,
        required: true
    },
    language:{
        type: String,
        required: true
    },
    numberOfPages:{
        type: Number,
        required: true
    },
    publisher:{
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Book', bookSchema)
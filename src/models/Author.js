const mongoose = require('mongoose')

const authorSchema =  new mongoose.Schema({
    name:{
        type: String,
        required: true
        },
        country:{
            type:String,
        },
        birthDate:{
            type:Date,
        },
        note:{
            type:String,
        }},{
            timestamps:true
        
})

module.exports = mongoose.model('Author', authorSchema)
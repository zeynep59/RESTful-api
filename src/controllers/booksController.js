const mongoose = require('mongoose')
const Author = require('../models/Author')
const Book = require('../models/Book')

exports.createBook = async(request, response) =>{
    try{
      

        const newProduct = await Product.create(request.body)

        return response.status(201).json(newProduct)
    } catch(error) {
        return response.status(500).json({ error: error.message })
    }
}



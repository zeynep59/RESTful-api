const mongoose = require('mongoose')
const Book = require('../models/Book')
const Author = require('../models/Author')


exports.createAuthor = async(request, response) => {
    try{
      
        const newAuthor = await Author.create(request.body)

        return response.status(201).json(newAuthor)
    } catch(error) {
        return response.status(500).json({ error: error.message })
    }
    }

    exports.getAllAuthors = async (request, response) => {
        try {
            const authors = await Author.find().select('-__v')
    
            return response.status(200).json(authors)
        } catch(error) {
            return response.status(500).json({ error: error.message })
        }
    }


    exports.updateAuthorById = async (request, response) => { //name country ... 
        try {
           
        } catch(error) {
            return response.status(500).json({ error: error.message })
        }
    }
    

    exports.deleteAuthorById = async (request, response) => {
        try {
            if (!mongoose.isValidObjectId(request.params.id)) {
                return response.status(422).json({ error: 'Parameter is not a valid id' })
            }
    
            const author = await Author.findById(request.params.id)
    
            if (!author) {
                return response.status(404).json({ error: 'Author not found' })
            } else {
                const booksCount = await Book.countDocuments({ author: author._id })
    
                if (booksCount > 0) {
                    return response.status(409).json({ error: `Author ${author.name} is being use in ${booksCount} product(s)` })
                }
    
                await author.deleteOne()
            }
    
            return response.status(204).send()
        } catch(error) {
            return response.status(500).json({ error: error.message })
        }
    }


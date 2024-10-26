const mongoose = require('mongoose')
const Book = require('../models/Book')

exports.createBook = async (request, response) => {
    try {
        const { title, author, price, ISBN, language, numberOfPages, publisher } = request.body

        if (!title || !author ) {
            return response.status(422).json({ error: 'All fields are required' })
        }

        if (await Book.findOne({ ISBN })) {
            return response.status(409).json({ error: `A book with ISBN ${ISBN} already exists` })
        }

        const newBook = await Book.create(request.body)

        return response.status(201).json(newBook)
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}

exports.getAllBooks = async (request, response) => {
    try {
        const books = await Book.find().select('-__v').populate('author', 'name')

        return response.status(200).json(books)
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}

exports.updateBookById = async (request, response) => {
    try {
        if (!mongoose.isValidObjectId(request.params.id)) {
            return response.status(422).json({ error: 'Parameter is not a valid id' })
        }

        if (!await Book.exists({ _id: request.params.id })) {
            return response.status(404).json({ error: 'Book not found' })
        }

        const bookUpdated = await Book.findByIdAndUpdate(request.params.id, request.body, { new: true })

        return response.status(200).json(bookUpdated)
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}

exports.deleteBookById = async (request, response) => {
    try {
        if (!mongoose.isValidObjectId(request.params.id)) {
            return response.status(422).json({ error: 'Parameter is not a valid id' })
        }

        const book = await Book.findById(request.params.id)

        if (!book) {
            return response.status(404).json({ error: 'Book not found' })
        }

        await book.deleteOne()

        return response.status(204).send()
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}

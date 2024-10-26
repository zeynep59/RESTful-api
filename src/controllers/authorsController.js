const mongoose = require('mongoose')
const Author = require('../models/Author')
exports.createAuthor = async (request, response) => {
    try {
        const { name, country, birthDate, note } = request.body;
        console.log(request.body)
        if (!name ) {
            return response.status(422).json({ error: 'Name, country, and birth date are required fields' });
        }

        // Convert birthDate from DD/MM/YYYY to YYYY-MM-DD
        const [day, month, year] = birthDate.split('/');
        const formattedBirthDate = new Date(`${year}-${month}-${day}`);

        const newAuthor = await Author.create({
            name,
            country,
            birthDate: formattedBirthDate,
            note,
        });

        return response.status(201).json(newAuthor);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}


exports.getAllAuthors = async (request, response) => {
    try {
        const authors = await Author.find().select('-__v')

        return response.status(200).json(authors)
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}

exports.updateAuthorById = async (request, response) => {
    try {
        if (!mongoose.isValidObjectId(request.params.id)) {
            return response.status(422).json({ error: 'Parameter is not a valid id' })
        }

        if (!await Author.exists({ _id: request.params.id })) {
            return response.status(404).json({ error: 'Author not found' })
        }

        const authorUpdated = await Author.findByIdAndUpdate(request.params.id, request.body, { new: true })

        return response.status(200).json(authorUpdated)
    } catch (error) {
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
        }

        await author.deleteOne()

        return response.status(204).send()
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}

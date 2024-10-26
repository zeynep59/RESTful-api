const router = require('express').Router()
const authorsController = require('../controllers/authorsController')

router.post('/', authorsController.createAuthor)
router.get('/', authorsController.getAllAuthors)
router.put('/:id', authorsController.updateAuthorById)
router.delete('/:id', authorsController.deleteAuthorById)

module.exports = router

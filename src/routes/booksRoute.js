const router = require('express').Router()
const booksController = require('../controllers/booksController')

router.post('/', booksController.createBook)
router.get('/', booksController.getAllBooks)
router.put('/:id', booksController.updateBookById)
router.delete('/:id', booksController.deleteBookById)

module.exports = router
  
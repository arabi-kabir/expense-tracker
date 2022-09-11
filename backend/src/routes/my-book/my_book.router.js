const express = require('express')
const FileUpload = require('../../services/file-upload')
const {
    getAllBook,
    getBook,
    insertBook,
    deleteBook,
    updateBook,
    lastTransactions
} = require('./my_book.controller')
const auth = require('../../middleware/auth')

const bookRouter = express.Router()

bookRouter.use(auth)

bookRouter.get   ('/', getAllBook)
bookRouter.get   ('/:id', getBook)
bookRouter.post  ('/', FileUpload.single('photo'), insertBook)
bookRouter.delete('/:id', deleteBook)
bookRouter.put   ('/:id', FileUpload.single('photo'), updateBook)

bookRouter.get   ('/expenses/:id', lastTransactions)

module.exports = bookRouter
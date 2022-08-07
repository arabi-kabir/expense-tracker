const express = require('express')
const {
    getAllBook,
    getBook,
    insertBook,
    deleteBook,
    updateBook,
    lastTransactions
} = require('./my_book.controller')

const bookRouter = express.Router()

bookRouter.get   ('/', getAllBook)
bookRouter.get   ('/:id', getBook)
bookRouter.post  ('/', insertBook)
bookRouter.delete('/:id', deleteBook)
bookRouter.put   ('/:id', updateBook)

bookRouter.get   ('/expenses/:id', lastTransactions)

module.exports = bookRouter
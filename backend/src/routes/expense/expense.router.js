const express = require('express')
const {
    getAllExpense,
    getExpense,
    insertExpense,
    updateExpense,
    deleteExpense
} = require('./expense.controller')

const expenseRouter = express.Router()

expenseRouter.get   ('/', getAllExpense)
expenseRouter.get   ('/:id', getExpense)
expenseRouter.post  ('/', insertExpense)
expenseRouter.put   ('/:id', updateExpense)
expenseRouter.delete('/:id', deleteExpense)

module.exports = expenseRouter
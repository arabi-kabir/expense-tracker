const express = require('express')
const {
    getAllExpense,
    getExpense,
    insertExpense,
    updateExpense,
    deleteExpense,
    getExpenseChartData,
    dumpExpense
} = require('./expense.controller')

const expenseRouter = express.Router()

expenseRouter.get   ('/', getAllExpense)
expenseRouter.get   ('/:id', getExpense)
expenseRouter.post  ('/', insertExpense)
expenseRouter.put   ('/:id', updateExpense)
expenseRouter.delete('/:id', deleteExpense)

expenseRouter.post('/expense-chart-data', getExpenseChartData)

expenseRouter.post('/dump-data', dumpExpense)

module.exports = expenseRouter
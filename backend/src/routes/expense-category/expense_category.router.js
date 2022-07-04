const express = require('express')
const {
    getAllExpenseCategory,
    getExpenseCategory,
    insertExpenseCategory,
    deleteExpenseCategory,
    updateExpenseCategory
} = require('./expense_category.controller')

const expenseCategoryRouter = express.Router()

expenseCategoryRouter.get   ('/', getAllExpenseCategory)
expenseCategoryRouter.get   ('/:id', getExpenseCategory)
expenseCategoryRouter.post  ('/', insertExpenseCategory)
expenseCategoryRouter.delete('/:id', deleteExpenseCategory)
expenseCategoryRouter.put   ('/:id', updateExpenseCategory)

module.exports = expenseCategoryRouter
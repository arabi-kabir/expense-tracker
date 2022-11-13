const express = require('express')
const FileUpload = require('../../services/file-upload')
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
expenseCategoryRouter.post  ('/', FileUpload.single('photo'), insertExpenseCategory)
expenseCategoryRouter.delete('/:id', deleteExpenseCategory)
expenseCategoryRouter.put   ('/:id', FileUpload.single('photo'), updateExpenseCategory)

module.exports = expenseCategoryRouter
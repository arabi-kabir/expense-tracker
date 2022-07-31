const express = require('express')
const {
    getExpenseReport
} = require('./report_expense.controller')

const expenseReportRouter = express.Router()

expenseReportRouter.get('/', getExpenseReport)

module.exports = expenseReportRouter
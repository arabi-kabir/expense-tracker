const express = require('express')
const {
    getExpenseReport
} = require('./report_expense.controller')
const auth = require('../../../middleware/auth')

const expenseReportRouter = express.Router()

expenseReportRouter.use(auth)

expenseReportRouter.get('/', getExpenseReport)

module.exports = expenseReportRouter
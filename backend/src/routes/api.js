const express = require('express')

const authRouter = require('./auth/auth.router')
const expenseCategoryRouter = require('./expense-category/expense_category.router')
const myBookRouter = require('./my-book/my_book.router')
const expenseRouter = require('./expense/expense.router')
const expenseReportRouter = require('./report/expense/report_expense.router')
const cashInRouter = require('./cash-in/cash_in.router')

const api = express.Router()

// routers
api.use('/auth', authRouter)
api.use('/expense-category', expenseCategoryRouter)
api.use('/my-book', myBookRouter)
api.use('/expense', expenseRouter)
api.use('/report/expense', expenseReportRouter)
api.use('/cash-in', cashInRouter)

// export module
module.exports = api
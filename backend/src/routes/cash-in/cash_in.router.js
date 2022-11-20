const express = require('express')
const {
    getAllCashIn,
    getSingleCashIn,
    insertCashIn
} = require('./cash_in.controller')
const auth = require('../../middleware/auth')

const cashInRouter = express.Router()

cashInRouter.use(auth)

cashInRouter.get   ('/', getAllCashIn)
cashInRouter.get   ('/:id', getSingleCashIn)
cashInRouter.post  ('/', insertCashIn)
// cashInRouter.put   ('/:id', updateExpense)
// cashInRouter.delete('/:id', deleteExpense)

module.exports = cashInRouter
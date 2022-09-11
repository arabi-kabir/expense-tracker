const { response } = require('express');
var mongoose = require('mongoose');

const Expense = require('../../../models/expense.model')

// get all expense
async function getExpenseReport(req, res) {
    const PAGE_SIZE = 20
    const page = parseInt(req.query.page || 0)
    const total = await Expense.countDocuments({})
    const start_date = new Date(req.query.start_date)
    const end_date = new Date(req.query.end_date)

    const searchStartDate = start_date.setHours(0,0,0,0);
    const searchEndDate = end_date.setHours(29,59,59,999);

    const expenses = await Expense.find({
        expense_date : {
                $gte: searchStartDate,
                $lte: searchEndDate
            }
        })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page)
        .populate('payment_method')
        .populate('expense_categories')
        .sort({'createdAt': -1})

    return res.status(201).json({
        expenses,
        totalPages: Math.ceil(total / PAGE_SIZE)
    })
}

module.exports = {
    getExpenseReport
}
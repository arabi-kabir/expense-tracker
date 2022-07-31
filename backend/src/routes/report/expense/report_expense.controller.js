const { response } = require('express');
var mongoose = require('mongoose');

const Expense = require('../../../models/expense.model')

// get all expense
async function getExpenseReport(req, res) {
    const PAGE_SIZE = 20
    const page = parseInt(req.query.page || 0)
    const total = await Expense.countDocuments({})

    const expenses = await Expense.find({})
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
const { log } = require('console');
var mongoose = require('mongoose');
const util = require('util')
var ObjectId = require('mongodb').ObjectID;

const Expense = require('../../../models/expense.model')

// get all expense
async function getExpenseReport(req, res) {

    console.log(req.query);

    const PAGE_SIZE = 20
    const page = parseInt(req.query.page || 0)
    const total = await Expense.countDocuments({})
    const start_date = new Date(req.query.start_date)
    const end_date = new Date(req.query.end_date)

    const searchStartDate = start_date.setHours(0,0,0,0);
    const searchEndDate = end_date.setHours(29,59,59,999);

    let pipeline = [];

    if(req.query.expenseName != '') {
        pipeline.push({
            $match: {
                $text: {
                    $search: req.query.expenseName
                }
            }
        })
    }

    if(req.query.category != '') {
        pipeline.push({
            $match: {
                expense_categories: ObjectId(req.query.category)
            }
        })
    }

    if(req.query.book != '') {
        pipeline.push({
            $match: {
                'payments.method': ObjectId(req.query.book)
            }
        })
    }

    pipeline.push(
        { 
            $match: {
                expense_date: {
                    $gte: start_date,
                    $lte: end_date
                }
            } 
        },
       
        { 
            $project: { 
                expense_name: 1, 
                expense_categories: 1, 
                expense_date: 1,
                payments: 1,
                total: {
                    $sum: "$payments.amount"
                } 
            } 
        },
        {
            $lookup: {
                from: 'expensecategories',
                localField: 'expense_categories',
                foreignField: '_id',
                as: 'category'
            }
        },
        {
            $unwind: {
                path: '$payments'
            }
        },
        {
            $lookup: {
                from: 'mybooks',
                localField: 'payments.method',
                foreignField: '_id',
                as: 'result'
            }
        },
        {
            $unwind: {
                path: '$result'
            }
        },
        {
            $addFields: {
                "result.amount": "$payments.amount",
            }
        },
        {
            $group: {
                _id: "$_id",
                paymentData: {
                    $push: "$result"
                },
                expense_name: {$first: '$expense_name'},
                expense_date: {$first: '$expense_date'},
                expense_category: { $first: '$category' },
                expense_total: { $first: '$total' }
            }
        }
    )

    const expenses = await Expense.aggregate(pipeline);
    
    // console.log(util.inspect(expenses, false, null, true /* enable colors */))

    return res.status(201).json({
        expenses,
        totalPages: Math.ceil(total / PAGE_SIZE)
    })
}

module.exports = {
    getExpenseReport
}
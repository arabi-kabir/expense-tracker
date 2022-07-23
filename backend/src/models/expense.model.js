const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    expense_name: {
        type: String,
        trim: true,
        required: true
    },
    expense_amount: {
        type: String,
        required: true
    },
    payment_method: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MyBook',
        required: false
    },
    expense_categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExpenseCategory'
    }
}, {
    timestamps: true
})

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense
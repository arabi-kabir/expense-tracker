const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    expense_name: {
        type: String,
        trim: true,
        required: true
    },
    expense_categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExpenseCategory'
    },
    expense_date: {
        type: Date
    },
    payments: [
        {
            method: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'MyBook',
                required: true,
                autopopulate: true
            },
            amount: {
                type: Number,
                required: true
            }
        }
    ],
    is_deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

expenseSchema.plugin(require('mongoose-autopopulate'));

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense
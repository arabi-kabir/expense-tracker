const mongoose = require('mongoose')

const expenseCategorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        trim: true,
        required: true
    },
    category_status: {
        type: String,
        required: true
    },
    sub_categories: [
        {
            sub_category_name: {
                type: String,
                required: true
            }
        }
    ]
}, {
    timestamps: true
})

expenseCategorySchema.virtual('expenses', {
    ref: 'Expense',
    localField: '_id',
    foreignField: 'expense_categories'
})

const ExpenseCategory = mongoose.model('ExpenseCategory', expenseCategorySchema)

module.exports = ExpenseCategory
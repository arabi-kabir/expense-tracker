import Scheme from 'validate'

const expense = new Scheme({
    expenseName: {
        type: String,
        required: true,
        length: { min: 1, max: 200 },

        message: {
            type: 'Expense name must be a string.',
            required: 'Expense name is required.'
        }
    },
    expenseCategory: {
        type: String,
        required: true,
        length: { min: 1 },

        message: {
            type: 'Expense category must be a string.',
            required: 'Expense category is required.'
        }
    },
    expenseDate: {
        required: true,

        message: {
            required: 'Expense date is required.'
        }
    },
    payments: {
        type: Array,
        each: {
            amount: {
                type: Number,
                required: true,

                message: {
                    required: 'Expense amount is required.'
                }
            },
            method: {
                type: String,
                required: true,

                message: {
                    required: 'Book is required.'
                }
            }
        }
    }
})

export default expense
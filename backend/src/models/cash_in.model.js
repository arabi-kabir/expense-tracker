const mongoose = require('mongoose')

const cashInSchema = new mongoose.Schema({
    cash_in_title: {
        type: String,
        trim: true,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    cash_in_book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MyBook',
        required: true,
        autopopulate: true
    },
    cash_in_date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

cashInSchema.plugin(require('mongoose-autopopulate'));

const CashIn = mongoose.model('CashIn', cashInSchema)

module.exports = CashIn
const mongoose = require('mongoose')

const myBookSchema = new mongoose.Schema({
    book_name: {
        type: String,
        trim: true,
        required: true
    },
    book_tag: {
        type: String,
        required: false
    },
    book_image: {
        type: String,
        required: false
    },
    current_balance: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
})

const MyBook = mongoose.model('MyBook', myBookSchema)

module.exports = MyBook
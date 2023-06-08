var ObjectId = require('mongodb').ObjectID;
const MyBook = require('../../models/my_book.model')
const Expense = require('../../models/expense.model')

// get all book
async function getAllBook(req, res) {
    try {
        return res.status(200).json(await MyBook.find({}))
    } catch (error) {
        res.status(400).send(error)
    }
}

async function getBook(req, res) {
    try {
        return res.status(200).json(await MyBook.findOne({ _id: req.params.id }))
    } catch (error) {
        res.status(400).send(error)
    }
}

// insert a book
async function insertBook(req, res) {
    const myBook = new MyBook({
        book_name: req.body.bookName,
        book_tag: req.body.bookTag,
        current_balance: 0,
        book_image: req.file.filename
    })
   
    try {
        await myBook.save()
        res.status(201).send(myBook)
    } catch (error) {
        res.status(400).send(error)
    }
}

// update book
async function updateBook(req, res) {
   
    try {
        const doc = await MyBook.findById(req.params.id)

        // res.send(doc);

        if(!doc) {
            return res.status(400).send('my book not found')
        }

        doc.book_name = req.body.bookName
        doc.book_tag = req.body.bookTag
        doc.current_balance = req.body.currentBalance
        if(req.file) {
            doc.book_image = req.file.filename
        }

        await doc.save()

        res.send('my book updated')
    } catch (error) {
        res.status(400).send(error)
    }
}

// delete book
async function deleteBook(req, res) {
    try {
        const result = await MyBook.findById(req.params.id)

        if(!result) {
            return res.status(400).send('my book not found')
        }

        result.remove()
        res.status(200).send('my book deleted')
    } catch (error) {
        res.status(400).send(error)
    }
}

// last 20 transaction
async function lastTransactions(req, res) {
    try {
        const expenses = await Expense.aggregate([
            {
                $unwind: {
                    path: '$payments'
                }
            },
            {
                $match: {
                    "payments.method": ObjectId(req.params.id)
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
                $sort: {
                    createdAt: -1
                }
            },
            {
                $limit: 20
            }
        ])

        return res.status(200).json(expenses)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllBook,
    insertBook,
    getBook,
    updateBook,
    deleteBook,
    lastTransactions
}
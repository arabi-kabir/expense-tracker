var ObjectId = require('mongodb').ObjectID;
const CashIn = require('../../models/cash_in.model');
const MyBook = require('../../models/my_book.model');

// get all book
async function getAllCashIn(req, res) {
    try {
        const PAGE_SIZE = 5
        const page = parseInt(req.query.page || 0)
        const total = await CashIn.countDocuments({})
    
        const cashInData = await CashIn.find({})
            .limit(PAGE_SIZE)
            .skip(PAGE_SIZE * page)
            .sort({'createdAt': -1})

        return res.status(201).json({
            cashInData,
            totalPages: Math.ceil(total / PAGE_SIZE)
        })
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

async function getSingleCashIn(req, res) {
    try {
        return res.status(200).json(await CashIn.findOne({ _id: req.params.id }))
    } catch (error) {
        res.status(400).send(error)
    }
}

// insert a book
async function insertCashIn(req, res) {
    const cashIn = new CashIn({
        cash_in_title: req.body.cash_in_title,
        amount: req.body.amount,
        cash_in_book: req.body.cash_in_book,
        cash_in_date: req.body.cash_in_date
    })
   
    try {
        await cashIn.save()

        // Increment MyBook
        const mybook = await MyBook.findById(req.body.cash_in_book)
        mybook.current_balance = mybook.current_balance + Math.abs(req.body.amount)
        await mybook.save()

        res.status(201).send(cashIn)
    } catch (error) {
        res.status(400).send(error)
    }
}

// update book
// async function updateBook(req, res) {
   
//     try {
//         const doc = await MyBook.findById(req.params.id)

//         // res.send(doc);

//         if(!doc) {
//             return res.status(400).send('my book not found')
//         }

//         doc.book_name = req.body.bookName
//         doc.book_tag = req.body.bookTag
//         doc.current_balance = req.body.currentBalance
//         if(req.file) {
//             doc.book_image = req.file.filename
//         }

//         await doc.save()

//         res.send('my book updated')
//     } catch (error) {
//         res.status(400).send(error)
//     }
// }

// // delete book
// async function deleteBook(req, res) {
//     try {
//         const result = await MyBook.findById(req.params.id)

//         if(!result) {
//             return res.status(400).send('my book not found')
//         }

//         result.remove()
//         res.status(200).send('my book deleted')
//     } catch (error) {
//         res.status(400).send(error)
//     }
// }

module.exports = {
    getAllCashIn,
    getSingleCashIn,
    insertCashIn,
    // updateBook,
    // deleteBook,
    // lastTransactions
}
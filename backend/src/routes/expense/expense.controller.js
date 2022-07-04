const Expense = require('../../models/expense.model')
const Mailer = require('../../services/node-mailer')

// get all expense
async function getAllExpense(req, res) {
    return res.status(200).json(await Expense.find({}).populate('payment_method'))
}

// get a expense
async function getExpense(req, res) {
    try {
        return res.status(200).json(await Expense.findOne({ _id: req.params.id }).populate('payment_method'))
    } catch (error) {
        res.status(400).send(error)
    }
}

// expense insert
async function insertExpense(req, res) {
    const data = req.body

    const expense = new Expense({
        expense_name: data.expense_name,
        expense_amount: data.expense_amount,
        payment_method: data.payment_method,
        expense_categories: data.expense_categories,
    })

    try {
        await expense.save()

        // send mail
        Mailer.sendMail({
            from: '<mail2arabi@gmailcom>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Expense Added", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        res.status(201).send(expense)
    } catch (error) {
        res.status(400).send(error)
    }
}

// expense delete
async function deleteExpense(req, res) {
    try {
        const expense = await Expense.findOne({ _id: req.params.id })

        if(!expense) {
            res.status(400).send('expense not found')
        } else {
            expense.remove()
            res.status(200).send('expense deleted')
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

// expense update
async function updateExpense(req, res) {
    try {
        const doc = await Expense.findById(req.params.id)
    
        if(!doc) {
            res.status(400).send('expense not found')
        } else {
            doc.expense_name = data.expense_name,
            doc.expense_amount = data.expense_amount,
            doc.payment_method = data.payment_method,
            doc.expense_categories = data.expense_categories,
            await doc.save()
            res.status(200).send('expense updated')
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    getAllExpense,
    getExpense,
    insertExpense,
    deleteExpense,
    updateExpense
}
var mongoose = require('mongoose');

const Expense = require('../../models/expense.model')
const Mailer = require('../../services/node-mailer')

// get all expense
async function getAllExpense(req, res) {
    const PAGE_SIZE = 5
    const page = parseInt(req.query.page || "0")
    const total = await Expense.countDocuments({})

    const expenses = await Expense.find({}).limit(PAGE_SIZE).skip(PAGE_SIZE * page).populate('payment_method')

    return res.json({
        expenses,
        totalPages: Math.ceil(total / PAGE_SIZE)
    })
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
        payment_method:  data.payment_method,
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

async function dumpExpense(req, res) {
    const payment = ['62814314701af5904c668964', '62b739d1659bb420ef7aef4f', '62b739d8659bb420ef7aef51', '62b739e1659bb420ef7aef53'];
    const expense_cat = ['626853ad7857379b8b07a19e', '6280880496634879feb90933']

    const names = ['burger', 'pizza', 'ice-cream']
    const amount = [132,234,345,13,2435,6,56,46,7567,3,24,2]

    for(i=1;i<100;i++) {
        const expense = new Expense({
            expense_name: getRandomItem(names),
            expense_amount: getRandomItem(amount),
            payment_method: mongoose.Types.ObjectId(getRandomItem(payment)) ,
            expense_categories: mongoose.Types.ObjectId(getRandomItem(expense_cat)),
        })

        console.log(expense);
    
        try {
            await expense.save()
         
        } catch (error) {
            res.status(400).send(error)
        }
    }

    return back()
}

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length)
    const item = arr[randomIndex];
    return item;
}

module.exports = {
    getAllExpense,
    getExpense,
    insertExpense,
    deleteExpense,
    updateExpense,
    dumpExpense
}
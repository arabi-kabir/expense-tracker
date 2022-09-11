const uuidv4 = require('uuid/v4');
const ExpenseCategory = require('../../models/expense_category.model')

// get all expense category
async function getAllExpenseCategory(req, res) {
    return res.status(200).json(await ExpenseCategory.find({}))
}

// get a expense categry
async function getExpenseCategory(req, res) {
    try {
        return res.status(200).json(await ExpenseCategory.findOne({ _id: req.params.id }))
    } catch (error) {
        res.status(400).send(error)
    }
}

// expense category insert
async function insertExpenseCategory(req, res) {
    const data = req.body

    const expense_category = new ExpenseCategory({
        category_name: data.category_name,
        category_status: data.category_status,
        category_image: req.file.filename
    })

    try {
        await expense_category.save()
        res.status(201).send(expense_category)
    } catch (error) {
        res.status(400).send(error)
    }
}

// expense category delete
async function deleteExpenseCategory(req, res) {
    try {
        const expense_category = await ExpenseCategory.findOne({ _id: req.params.id })

        if(!expense_category) {
            res.status(400).send('expense category not found')
        } else {
            expense_category.remove()
            res.status(200).send('expense category deleted')
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

// expense category update
async function updateExpenseCategory(req, res) {
    try {
        const doc = await ExpenseCategory.findById(req.params.id)
    
        if(!doc) {
            res.status(400).send('expense category not found')
        } else {
            doc.category_name = req.body.category_name
            await doc.save()
            res.status(200).send('expense category updated')
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    getAllExpenseCategory,
    getExpenseCategory,
    insertExpenseCategory,
    deleteExpenseCategory,
    updateExpenseCategory
}
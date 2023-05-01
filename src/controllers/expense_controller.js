const generateUUID = require('../services/uuid')
const Expense = require('../models/expense')
const Message = require('../models/message')


const editableExpenseColumns = ['expense_cost', 'expense_description', 'expense_category']

class ExpenseController {
    static getExpenses(req, res) {
        const spaceId = req.params.space_id

        Expense.findAll({ where: { expense_space: spaceId} })
            .then((result) => res.json(result))
            .catch((err) => res.json(new Message(err)))
    }

    static createExpenses(req, res) {
        const username = req.username
        const spaceId = req.params.space_id
        const parameters = req.body

        Expense.create({ 
            expense_id: generateUUID(), 
            expense_space: spaceId,
            expense_paid_by: username,
            ...parameters 
        })
            .then((result) => res.json(result))
            .catch((err) => res.json(new Message(err)))
    }

    static deleteExpense(req, res) {
        const spaceId = req.params.space_id
        const expenseId = req.params.expense_id

        Expense.destroy({where: { expense_id: expenseId, expense_space: spaceId }})
            .then((result) => {
                if (result == 0) {
                    res.status(404).json(new Message(`Expense ${expenseId} does not exists!`))
                } else {
                    res.json(result)
                }
            })
            .catch((err) => res.json(new Message(err)))
    }

    static updateExpense(req, res) {
        const spaceId = req.params.space_id
        const expenseId = req.params.expense_id
        const updatedField = req.body

        // Check if you can edit the attribute
        for (let field in updatedField) {
            if (!editableExpenseColumns.includes(field)) {
                res.status(400).json(new Message(`You can't edit ${field}!`))
                return
            }
        }

        Expense.update(
            updatedField, 
            { where: { expense_id: expenseId, expense_space: spaceId} })
            .then((result) => res.json(result))
            .catch((err) => res.status(500).json(new Message(err)))
    }
}

module.exports = ExpenseController
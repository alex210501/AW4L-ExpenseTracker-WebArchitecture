const express = require("express");
const router = express.Router()

const CategoryController = require('../controllers/category_controller')
const ExpenseController = require('../controllers/expense_controller')
const SpaceController = require('../controllers/space_controller')
const UserSpaceController = require('../controllers/user_space_controller')


router.get('/', SpaceController.getSpaces)
router.post('/', SpaceController.createSpace)
router.get('/:space_id', SpaceController.getSpace)
router.delete('/:space_id', SpaceController.deleteSpace)
router.patch('/:space_id', SpaceController.updateSpace)

// Expenses
router.get('/:space_id/expense', ExpenseController.getExpenses)
router.post('/:space_id/expense', ExpenseController.createExpenses)
router.delete('/:space_id/expense/:expense_id', ExpenseController.deleteExpense)
router.patch('/:space_id/expense/:expense_id', ExpenseController.updateExpense)

// User space
router.get('/:space_id/user', UserSpaceController.getUsers)
router.post('/:space_id/user', UserSpaceController.addUser)
router.delete('/:space_id/user/:username', UserSpaceController.deleteUser)
router.post('/:space_id/join', UserSpaceController.joinSpace)
router.post('/:space_id/quit', UserSpaceController.quitSpace)

// Category
router.get('/:space_id/category', CategoryController.getCategories)
router.post('/:space_id/category', CategoryController.createCategory)
router.delete('/:space_id/category/:category_id', CategoryController.deleteCategory)

module.exports = router
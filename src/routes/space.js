const express = require("express");
const router = express.Router()

const { isTokenValid } = require('../modules/authentication_tools')
const CategoryController = require('../controllers/category_controller')
const ExpenseController = require('../controllers/expense_controller')
const SpaceController = require('../controllers/space_controller')
const UserSpaceController = require('../controllers/user_space_controller')


router.get('/', isTokenValid, SpaceController.getSpaces)
router.post('/', isTokenValid, SpaceController.createSpace)
router.get('/:space_id', isTokenValid, SpaceController.getSpace)
router.delete('/:space_id', isTokenValid, SpaceController.deleteSpace)
router.patch('/:space_id', isTokenValid, SpaceController.updateSpace)

// Expenses
router.get('/:space_id/expense', isTokenValid, ExpenseController.getExpenses)
router.post('/:space_id/expense', isTokenValid, ExpenseController.createExpenses)
router.delete('/:space_id/expense/:expense_id', isTokenValid, ExpenseController.deleteExpense)
router.patch('/:space_id/expense/:expense_id', isTokenValid, ExpenseController.updateExpense)

// User space
router.get('/:space_id/user', isTokenValid, UserSpaceController.getUsers)
router.post('/:space_id/user', isTokenValid, UserSpaceController.addUser)
router.delete('/:space_id/user/:username', isTokenValid, UserSpaceController.deleteUser)
router.post('/:space_id/join', isTokenValid, UserSpaceController.joinSpace)
router.post('/:space_id/quit', isTokenValid, UserSpaceController.quitSpace)

// Category
router.get('/:space_id/category', isTokenValid, CategoryController.getCategories)
router.post('/:space_id/category', isTokenValid, CategoryController.createCategory)
router.delete('/:space_id/category/:category_id', isTokenValid, CategoryController.deleteCategory)

module.exports = router
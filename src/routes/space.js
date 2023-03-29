const express = require("express");
const router = express.Router()

const CategoryController = require('../controllers/category_controller')
const ExpenseController = require('../controllers/expense_controller')
const SpaceController = require('../controllers/space_controller')


router.get('/', (req, res) => SpaceController.getSpaces(req, res))
router.post('/', (req, res) => SpaceController.createSpace(req, res))
router.get('/:space_id', (req, res) => SpaceController.getSpace(req, res))
router.delete('/:space_id', (req, res) => SpaceController.deleteSpace(req, res))
router.patch('/:space_id', (req, res) => SpaceController.updateSpace(req, res))

// Expenses
router.get('/:space_id/expense', (req, res) => ExpenseController.getExpenses(req, res))
router.post('/:space_id/expense', (req, res) => ExpenseController.createExpenses(req, res))
router.delete('/:space_id/expense/:expense_id', (req, res) => ExpenseController.deleteExpense(req, res))
router.patch('/:space_id/expense/:expense_id', (req, res) => ExpenseController.updateExpense(req, res))

// User space
router.get('/:space_id/user', (req, res) => res.send('GET /space/{space_id}/user'))
router.post('/:space_id/user', (req, res) => res.send('POST /space/{space_id}/user'))
router.delete('/:space_id/user/:username', (req, res) => res.send('DELETE /space/{space_id}/user/{username}'))
router.post('/:space_id/join', (req, res) => res.send('POST /space/{space_id}/join'))
router.post('/:space_id/quit', (req, res) => res.send('POST /space/{space_id}/quit'))

// Category
router.get('/:space_id/category', (req, res) => CategoryController.getCategories(req, res))
router.post('/:space_id/category', (req, res) => CategoryController.createCategory(req, res))
router.delete('/:space_id/category/:category_id', (req, res) => CategoryController.deleteCategory(req, res))

module.exports = router
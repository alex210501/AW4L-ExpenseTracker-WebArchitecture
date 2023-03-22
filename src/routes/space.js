const express = require("express");
const router = express.Router()

router.get('/', (req, res) => res.send('GET /space'))
router.post('/', (req, res) => res.send('POST /space'))
router.get('/:space_id', (req, res) => res.send('GET /space/{space_id}'))
router.delete('/:space_id', (req, res) => res.send('DELETE /space/{space_id}'))
router.patch('/:space_id', (req, res) => res.send('PATCH /space/{space_id}'))

// Expenses
router.get('/:space_id/expense', (req, res) => res.send('GET /space/{space_id}/expense'))
router.post('/:space_id/expense', (req, res) => res.send('POST /space/{space_id}/expense'))
router.delete('/:space_id/expense/:expense_id', (req, res) => res.send('DELETE /space/{space_id}/expense/{expense_id}'))
router.patch('/:space_id/expense/:expense_id', (req, res) => res.send('PATCH /space/{space_id}/expense/{expense_id}'))

// User space
router.get('/:space_id/user', (req, res) => res.send('GET /space/{space_id}/user'))
router.post('/:space_id/user', (req, res) => res.send('POST /space/{space_id}/user'))
router.delete('/:space_id/user/:username', (req, res) => res.send('DELETE /space/{space_id}/user/{username}'))
router.post('/:space_id/join', (req, res) => res.send('POST /space/{space_id}/join'))
router.post('/:space_id/quit', (req, res) => res.send('POST /space/{space_id}/quit'))

// Category
router.get('/:space_id/category', (req, res) => res.send('GET /space/{space_id}/category'))
router.post('/:space_id/category', (req, res) => res.send('POST /space/{space_id}/category'))
router.delete('/:space_id/category/:category_id', (req, res) => res.send('DELETE /space/{space_id}/category/{category_id}'))

module.exports = router
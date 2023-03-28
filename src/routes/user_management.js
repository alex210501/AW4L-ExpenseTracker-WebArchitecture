const express = require("express");
const router = express.Router()

const UserController = require('../controllers/user_controller')

router.get('/', (req, res) => UserController.getUsers(req, res))
router.post('/', (req, res) => UserController.createUser(req, res))
router.delete('/:username', (req, res) => UserController.deleteUser(req, res))

module.exports = router

const express = require("express");
const router = express.Router()

const UserController = require('../controllers/user_controller')

router.get('/', UserController.getUsers)
router.post('/', UserController.createUser)
router.delete('/:username', UserController.deleteUser)

module.exports = router

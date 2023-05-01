const express = require("express");
const router = express.Router()

const { isTokenValid } = require('../modules/authentication_tools')
const UserController = require('../controllers/user_controller')

router.get('/', isTokenValid, UserController.getUsers)
router.post('/', UserController.createUser)
router.delete('/:username', isTokenValid, UserController.deleteUser)

module.exports = router

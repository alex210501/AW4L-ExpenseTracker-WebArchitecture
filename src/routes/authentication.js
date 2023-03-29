const express = require("express");
const router = express.Router()

const { isTokenValid } = require('../modules/authentication_tools')
const AuthenticationController = require("../controllers/authentication_controller")

router.post('/login', AuthenticationController.login)
router.post('/logout', isTokenValid, AuthenticationController.logout)

module.exports = router
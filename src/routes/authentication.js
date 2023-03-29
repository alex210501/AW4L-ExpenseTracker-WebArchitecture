const express = require("express");
const router = express.Router()

const AuthenticationController = require("../controllers/authentication_controller")

router.post('/login', AuthenticationController.login)
router.post('/logout', AuthenticationController.logout)

module.exports = router
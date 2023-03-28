const express = require("express");
const router = express.Router()

const AuthenticationController = require("../controllers/authentication_controller")

router.post('/login', (req, res) => AuthenticationController.login(req, res))
router.post('/logout', (req, res) => AuthenticationController.logout(req, res))

module.exports = router
const express = require("express");
const router = express.Router()

router.post('/login', (req, res) => res.send('POST /login'))
router.post('/logout', (req, res) => res.send('POST /logout'))

module.exports = router
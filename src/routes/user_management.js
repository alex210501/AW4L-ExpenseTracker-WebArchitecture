const express = require("express");
const router = express.Router()

router.get('/', (req, res) => res.send('GET /user'))
router.post('/', (req, res) => res.send('POST /user'))
router.delete('/:username', (req, res) => res.send('DELETE /user/{username}'))

module.exports = router
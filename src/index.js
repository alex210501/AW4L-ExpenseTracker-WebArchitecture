const express = require('express')

const authentication = require('./routes/authentication')
const space = require('./routes/space')
const user_management_routes = require('./routes/user_management')

const app = express()
const port = 8080

app.use('/auth', authentication)
app.use('/space', space)
app.use('/user', user_management_routes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
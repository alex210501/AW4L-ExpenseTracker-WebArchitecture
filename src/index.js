#!/usr/bin/env node

var cors = require('cors')
const express = require('express')

const sequilize = require('./services/database')
const Category = require('./models/category')
const Collaborator = require('./models/collaborator')
const Expense = require('./models/expense')
const Space = require('./models/space')
const User = require('./models/user')

// Routes
const authentication = require('./routes/authentication')
const space = require('./routes/space')
const user_management_routes = require('./routes/user_management')

const app = express()
const port = 8080

app.use(cors())
app.use(express.json())
app.use('/auth', authentication)
app.use('/space', space)
app.use('/user', user_management_routes)

sequilize.sync().then(() => {
    console.log('Tables created successfully!')
}).catch((error) => {
    console.error('Unable to create the tables: ', error)
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

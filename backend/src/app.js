const express = require('express')
const cors = require('cors')

const path = require('path')

const api = require('../src/routes/api')

const app = express()

app.use(cors())
app.use(express.json())

// routers
app.use('/v1', api)

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
// })

module.exports = app
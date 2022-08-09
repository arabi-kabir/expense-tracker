const express = require('express')
const cors = require('cors')
const path = require('path')
const fileUpload = require('express-fileupload')

const app = express()
app.use(cors())
app.use(fileUpload())

app.use(express.json())

// routers
const api = require('../src/routes/api')
app.use('/v1', api)

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
// })

module.exports = app
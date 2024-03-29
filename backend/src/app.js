const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())

app.use(express.json())

// routers
const api = require('../src/routes/api')
app.use('/v1', api)

app.get('/app-status', (req, res) => {
    res.send('App is running...')
})

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
// })

module.exports = app
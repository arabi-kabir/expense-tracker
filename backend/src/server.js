const http = require('http')

require('dotenv').config()

const app = require('./app')
const { mongoConnect } = require('../src/services/mongo')

// port
const PORT = process.env.PORT || 8000

// create server
const server = http.createServer(app)

async function startServer() {
    await mongoConnect()

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    })
}

startServer()
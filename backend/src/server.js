const http = require('http')
const path = require('path')

require('dotenv').config({ path: path.join(__dirname, ".env") })

const app = require('./app')
const { mongoConnect } = require('../src/services/mongo')

// port
const PORT = process.env.PORT || 8003

// create server
const server = http.createServer(app)

async function startServer() {
    await mongoConnect()

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    })
}

startServer()
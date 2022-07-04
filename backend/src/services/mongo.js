const mongoose = require('mongoose')

const MONGO_URL = 'mongodb+srv://arabikabir:lkjh6789@cluster0.b1gi6.mongodb.net/expense-tracker-api?retryWrites=true&w=majority'

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
})

mongoose.connection.on('error', (err) => {
    console.error(err);
})

// connect function
async function mongoConnect() {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

// disconnect function
async function mongoDisconnect() {
    await mongoose.disconnect()
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}
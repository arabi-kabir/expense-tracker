const jwt = require("jsonwebtoken")

const config = process.env

async function getUserInfo(req) {
    const token = req.body.token || req.query.token || req.headers["x-access-token"]

    if (!token) {
        return "A token is required for authentication"
    }

    try {
        const user = jwt.verify(token, config.TOKEN_KEY)
        return user
    } catch (err) {
        return "user not found"
    }
}

module.exports = {
    getUserInfo
}
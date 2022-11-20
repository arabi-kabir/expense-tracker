const express = require('express')
const auth = require("../../middleware/auth");
const {
    userRegister,
    userLogin,
    validateToken,
    authTest
} = require('./auth.controller')

const authRouter = express.Router()

authRouter.post('/register', userRegister)
authRouter.post('/login', userLogin)
authRouter.get ('/validate-token', validateToken)
authRouter.get ('/auth-test', auth, authTest)

module.exports = authRouter
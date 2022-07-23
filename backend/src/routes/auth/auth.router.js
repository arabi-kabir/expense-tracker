const express = require('express')
const auth = require("../../middleware/auth");
const {
    userRegister,
    userLogin,
    authTest
} = require('./auth.controller')

const authRouter = express.Router()

authRouter.post('/register', userRegister)
authRouter.post('/login', userLogin)
authRouter.get ('/auth-test', auth, authTest)

module.exports = authRouter
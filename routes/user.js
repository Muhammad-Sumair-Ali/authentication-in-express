const express = require("express");
const router = express.Router()
const {signUp,signIn} = require("../controllers/signUp")
const getUsers = require("../controllers/getUsers")

 router.post('/signUp', signUp)
 router.post('/signIn', signIn)
 router.get('/users', getUsers)

module.exports = router;
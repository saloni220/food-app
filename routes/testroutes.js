const express=require('express')
const { testControllerUser } = require('../controllers/testController')
const router = express.Router()
router.get('/test-user',testControllerUser)
module.exports=router
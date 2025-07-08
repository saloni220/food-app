const express=require('express');
const { registerController, loginController } = require('../controllers/authcontroller');
const validation = require('../middleware/registermiddleware');

const router = express.Router();



//register
router.post('/register', validation,registerController)
//login
router.post('/login',loginController)


module.exports=router
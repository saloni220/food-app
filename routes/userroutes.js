const express=require('express')
const { getusercontroller, updateusercntroller, updatepasswordcontroller,resetpasswordcontroller, deletusercontroller} = require('../controllers/usercontroller');
const authMiddleware = require('../middleware/authMiddleware');
const { reset } = require('colors');
const router = express.Router()
//get user | 
router.get('/getuser/:_id',authMiddleware, getusercontroller)
//update user profile
router.put('/updateuser/:_id',authMiddleware,updateusercntroller)
//password update
router.post('/updatepassword/:_id',authMiddleware,updatepasswordcontroller)
//reset password
router.post('/resetpassword/:_id',authMiddleware,resetpasswordcontroller)
//delete user profile
router.delete('/detleteuser/:_id',authMiddleware,deletusercontroller)
module.exports=router;


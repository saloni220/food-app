const express =require('express')
const authMiddleware = require("../middleware/authMiddleware");
const { default: mongoose } = require('mongoose');
const { createCategory, getallcategory, getSingleCategory, deleteCategory, updateCategory } = require('../controllers/categoryController');
const userRole = require('../middleware/authrestro');
const router =express.Router()
//create category
router.post('/create',authMiddleware,userRole,createCategory)
// get all category
router.get('/getallcategory',getallcategory)
//find single category
router.get('/getSinCategory/:_id',getSingleCategory)
//detete category
router.delete('/deleteCategory/:_id',authMiddleware,userRole,deleteCategory)
//update category
router.put('/updateCategory/:_id',authMiddleware,userRole,updateCategory)



module.exports= router;
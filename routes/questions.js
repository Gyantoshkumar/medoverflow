const express = require('express');
const router = express.Router();


//stories Index
router.get('/',(req,res)=>{
	res.render('questions/index');
})

//Add story Form 
router.get('/add',(req,res)=>{
	res.render('questions/add');
})

module.exports=router;
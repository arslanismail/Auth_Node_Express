const express=require('express');
const router=express.Router();
const bcrypt= require('bcryptjs');


const User =require('../models/User');

//  Login
router.get('/login',(req,res)=>{
    res.render('login')
})


// Register Page

router.get('/register',(req,res)=>{
    res.render('register')
})



// Register Handler

router.post('/register',(req,res)=>{
    const {name,email,password,password2}=req.body;
    let errors=[];
    if(!name || !email || !password || !password2){
        errors.push({msg: 'Please Fill All the fields '})

    }
    if(password !== password2){
        errors.push({msg:'Password does not Match'})
    }

    if(password.length < 6 ){
        errors.push({msg:'Password is should be atleast 6 characters'})
    
    }

    if(errors.length > 0 ){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        })
    }else{
        const createUser=async ()=>{
            const result=await User.findOne({email:email})
            if(result){
                errors.push({msg:'Email is already registered'})
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
            }else{
                const newUser=new User({
                    name,
                    email,
                    password
                })
                try{
                const saveUser2db=await newUser.save();
                res.redirect('/users/login');
                }catch(err){
                    console.log(err);
                }

            }
        }
        createUser();
        // User.findOne({email:email}).then()
    }
})

module.exports=router;
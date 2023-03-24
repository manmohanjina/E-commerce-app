const mongoose = require("mongoose");
const express = require("express");
const { UserRegisterModel } = require("../models/models");
const { validator } = require("../validatorM.D/valimiddleware");
const bcrypt=require('bcrypt')
require('dotenv').config()
const userAuthRoute = express.Router();
// userAuthRoute.use(validator);

userAuthRoute.use(express.json());

 
userAuthRoute.post('/register',async(req,res)=>{
    let {name,email,password}=req.body;

try {

     bcrypt.hash(password,4,async(err,hashed_pass)=>{
        if(err){
            res.send({"err":"error while hashing "})
            console.log(err)
        }
        else{
            let new_user=await UserRegisterModel({name,email,password:hashed_pass})
            await new_user.save() 
            res.send({"msg":"user_register_succ"})
        }
     })

    

} catch (error) {
    
}
})

module.exports = {
  userAuthRoute,
};

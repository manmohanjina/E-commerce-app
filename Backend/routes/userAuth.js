const mongoose = require("mongoose");
const express = require("express");
const { UserRegisterModel } = require("../models/models");

const bcrypt=require('bcrypt')
require('dotenv').config()
const userAuthRoute = express.Router();
// userAuthRoute.use(validator);

userAuthRoute.use(express.json());

 
userAuthRoute.post('/register',async(req,res)=>{
    let {name,email,password,phone,security}=req.body;
  

try {
    const saltround=process.env.saltrounds;
    //salt round should be typeod number;

     bcrypt.hash(password,+saltround ,async(err,hashed_pass)=>{
        if(err){
            res.send({"err":"error while hashing "})
            console.log(err)
        }
        else{
            let new_user=await UserRegisterModel({name,email,password:hashed_pass,phone,security})
            await new_user.save() 
            res.send({"msg":"user_register_succ"})
        }
     })

    

} catch (error) {
    console.log(error)
}
})

module.exports = {
  userAuthRoute,
};

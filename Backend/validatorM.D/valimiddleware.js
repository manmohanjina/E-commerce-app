const express = require("express");
const bcrypt = require("bcrypt");
const { UserRegisterModel } = require("../models/models");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const validator = (req, res, next) => {
  const token = req.headers.authorization;
 

  if (token) {
    //we need to verify the toke ;
 
    const decodeToken=jwt.verify(token,"manish",(err,decode)=>{
        if(err){
            res.send({"err":"getting invalid token"})
        }
        else if(decode){
            next()
        }
    })
    
    
}
else{
    res.send({"err":"login again"})
}
};

module.exports = {
  validator,
};

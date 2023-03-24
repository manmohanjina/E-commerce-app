const express = require("express");
const bcrypt = require("bcrypt");
const { UserRegisterModel } = require("../models/models");
require("dotenv").config();
const jwt = require("jsonwebtoken");




const validator = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    //we need to verify the toke ;
    const decodeToken = jwt.verify(token, "manish", (err, decode) => {
      if (err) {
        res.send({ err: "getting invalid token1" });
      } else if (decode) {
        req.user = decode;
        next();
      }
    });
    // const decode = jwt.verify(token, "manish");
    // req.user = decode;
    // console.log(req.user, "req.user");
    // next();
  } else {
    res.send({ err: "login again" });
  }
};

//admin access middleware;

const isAdmin = async (req, res, next) => {
  console.log(req.user);
  const user = await UserRegisterModel.findById(req.user._id);
  //console.log(user,"user")
  if (user.role !== 1) {
    return res.status(401).send({ err: "not authorized to be a admin" });
  } else {
    next();
  }
  try {
  } catch (error) {
    console.log(error);
    res.status(401).send({ err: "error in admin middleware" });
  }
};

module.exports = {
  validator,
  isAdmin,
};

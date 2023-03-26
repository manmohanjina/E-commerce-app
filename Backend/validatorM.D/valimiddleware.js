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
        //we are passing decode object in req.user from here so that this _id is accesable in admin route

        next();
      }
    });
  } else {
    res.send({ err: "login again" });
  }
};

//admin access middleware;

const isAdmin = async (req, res, next) => {
  const user = await UserRegisterModel.findById(req.user._id);
  if (user.role !== 1) {
    return res.status(401).send({ err: "unauthorized access" });
  } else {
    next();
  }
  try {
  } catch (error) {
    console.log(error);
    res.status(401).send({ err: "error in admin middleware" });
  }
};

///forgot password;

const forgotPassword = async (req, res, next) => {
  const { email, password, security } = req.body;
  if (!email) {
    return res.status(401).send({ err: "email is required" });
  }
  if (!password) {
    return res.status(401).send({ err: "password is required" });
  }
  if (!security) {
    return res.status(401).send({ err: "security is required" });
  }

  const isUserPressent = await UserRegisterModel.findOne({ email, security });

  let id = isUserPressent._id;
   id=id.valueOf();
 

  if (isUserPressent === null) {
    return res.status(401).send({ err: "email not registere" });
  } else {
    const saltround = process.env.saltrounds;
    //salt round should be typeod number;

    bcrypt.hash(password, +saltround, async (err, hashed_pass) => {
      if (err) {
        res.send({ err: "error while hashing password " });
        console.log(err);
      } else {
        await UserRegisterModel.findByIdAndUpdate(isUserPressent._id, {
          password: hashed_pass,
        });
        // res.status(200).send({ succ: "Your password has been updated" });
        next();
      }
     });
  }
};

module.exports = {
  validator,
  isAdmin,
  forgotPassword,
};

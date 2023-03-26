const express = require("express");
const userLoingRoute = express.Router();
const bcrypt = require("bcrypt");
const { UserRegisterModel } = require("../models/models");
const jwt = require("jsonwebtoken");
const { validator } = require("../validatorM.D/valimiddleware");
userLoingRoute.use(express.json())



userLoingRoute.post("/login", async (req, res) => {
  let { email, password } = req.body;
  const isUserPresent = await UserRegisterModel.find({ email });
  
  if(isUserPresent.length===0){
    return res.status(401).send({"err":"email not valid"})
  }
  if (isUserPresent) {
    const plain_pass = isUserPresent[0].password;

    bcrypt.compare(password, plain_pass, (err, result) => {
      if (err) {
        res.send({ err: "wrong Crendential" });
      } else if (result) {
        const secure_token = jwt.sign({ _id: isUserPresent[0].id }, "manish", {
          expiresIn:"7d",
        });
        res.send({ succ_token: secure_token });
      } else {
        res.send({ err: "wrong Credential" });
      }
    });
  } else {
    res.send({ err: "user Not Present Plz resgister first!" });
  }
});

module.exports = {
  userLoingRoute,
};

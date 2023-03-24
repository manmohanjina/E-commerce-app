const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const { connection } = require("./db/db");
const { userAuthRoute } = require("./routes/userAuth");
const { userLoingRoute } = require("./routes/userLoginRoute");
const { validator } = require("./validatorM.D/valimiddleware");






app.use(validator)
app.get('/secret',async(req,res)=>{
  console.log("secret data")
  res.send('ok')
})

app.use('/',userLoingRoute)
app.use("/",userAuthRoute)
app.get('/',async(req,res)=>{
  try {
    res.send({"msg":"welcome"})
  } catch (error) {
    res.send({"err":"errorr"})
  }
})




app.listen(process.env.port, () => {
  connection()
});

const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const { connection } = require("./db/db");
const { userAuthRoute } = require("./routes/userAuth");
const { userLoingRoute } = require("./routes/userLoginRoute");
const { validator } = require("./validatorM.D/valimiddleware");










app.use('/',userLoingRoute)
app.use("/",userAuthRoute)

app.use(validator)
app.get('/data',(req,res)=>{
  res.send("protected data")
})



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

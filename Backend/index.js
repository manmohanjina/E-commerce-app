const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const { connection } = require("./db/db");
const { catagoryRouter } = require("./routes/catagoryRoute");
const { productRoute } = require("./routes/productRouter");
const { userAuthRoute } = require("./routes/userAuth");
const { userLoingRoute } = require("./routes/userLoginRoute");








app.use('/',userLoingRoute)
app.use("/",userAuthRoute)


// app.use('/',forgotPassword,(req,res)=>{
//   res.send('ok')
// })
app.use('/',catagoryRouter)

app.use("/",productRoute)



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

const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const { connection } = require("./db/db");
const { heroModel } = require("./models/models");



app.get("/",(req,res)=>{
   res.send('welcom')
})


app.post("/post", async (req, res) => {
  let payload = req.body;

  try {
   const hero = new heroModel(payload);
  await hero.save()
  res.send('ok')
  } catch (error) {
   console.log(error);
  }
});

app.listen(process.env.port, () => {
  try {
    connection();
  } catch (err) {
    console.log(err);
  }
});

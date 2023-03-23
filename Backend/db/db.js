const mongoose = require("mongoose");
require("dotenv").config();

const connection=async()=>{
    try{
 await mongoose.connect(process.env.mongourl)
console.log('connected to mongo DB')
    }
    catch(err){
console.log('MongoDb connection Error')
    }
}


module.exports={
    connection
}
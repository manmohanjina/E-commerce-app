const mongoose = require("mongoose");

const CheckSchema = mongoose.Schema({
    name:String,
    age:Number,
});


const heroModel=mongoose.model("name we want to put here",CheckSchema)

module.exports={heroModel}

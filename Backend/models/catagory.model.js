const mongoose = require("mongoose");

const catagorySchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
  },
});

const CatagoryModel=mongoose.model("catagory",catagorySchema)

module.exports={CatagoryModel}

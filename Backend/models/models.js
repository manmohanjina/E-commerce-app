const mongoose = require("mongoose");

const userRegisterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: { type: String, require: true, unique: true },
    password: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    security:{
      type:String,
      require:true
    }
  },
  { timestamps: true }
);

const UserRegisterModel = mongoose.model("user_auth", userRegisterSchema);

module.exports = {
  UserRegisterModel,
};

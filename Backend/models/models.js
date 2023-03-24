
const mongoose=require('mongoose')

const userRegisterSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,

})


const UserRegisterModel=mongoose.model("user_auth",userRegisterSchema)


module.exports={
    UserRegisterModel
}

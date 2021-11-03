var mongoose=require('mongoose')
var UserSchema=new mongoose.Schema({
    name:String,
    sname:String,
    dob:String,
    email_id:String,
    username:String,
    password:String,

});
module.exports=mongoose.model("User",UserSchema);
var express          =require("express");
var router           =express.Router();
var User            =require("../models/user");

router.get("/register",function(req,res){
    res.render("register");

});
router.post("/register",function(req,res){
   var name=req.body.name;
   var sname=req.body.sname;

   var email_id=req.body.email_id;
   var username=req.body.username;
   var password=req.body.password;

    var newBooking={name:name,sname:sname,email_id:email_id,username:username,password:password}
    
    
    User.create(newBooking,function(err,user){

    
    if(err){
        console.log(err)
    }
    else{
        console.log(user);
        res.redirect("/")
        
    }
});

});
module.exports=router;
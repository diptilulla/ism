var express=require("express")
var router =express.Router();
var User  =require("../models/user");

router.get('/register',function(req,res){
     res.render("register")
});

router.post("/register",function(res,req){
    var name=req.body.name
    var sname=req.body.sname
    var dob=req.body.dob;
    var email_id=req.body.email;
    var username=req.body.username
    var password=req.body.password

    var newuser={name:name,sname:sname,dob:dob,email_id:email_id,username:username,password:password}
User.create(newuser,function(err,data){
    if(err)
    console.log("error")
    else
    {
        console.log(data)
        res.redirect("/")
    }
});
});

module.exports=router;
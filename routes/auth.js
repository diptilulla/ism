var express          =require("express");
var router           =express.Router();
var passport         =require("passport");
var User            =require("../models/user");

router.get('/users', function(req, res) {
    res.json({ currentUser: req.user });
});
router.get("/register",function(req,res){
    res.render("register");

});
router.post("/register",function(req,res){
   var name=req.body.name;
   var sname=req.body.sname;
   var email_id=req.body.email_id;
   var username=req.body.username;
   var password=req.body.password;

    var newBooking=new User({name:name,sname:sname,email_id:email_id,username:username})
    
    
    User.register(newBooking,password,function(err,user){

    
    if(err){
        console.log(err)
        return res.render("register")
    }
            passport.authenticate("local")(req,res,function(){
            res.redirect("/");
            console.log("i am working")

        });
        
    
    });

});

router.get("/login",function(req,res){
    res.render("login");
});

router.post("/login",passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/register"
}),function(req,res){

});

router.get("/logout",function(req,res){
    
    req.logout();
    res.redirect("/");
  
});













module.exports=router;
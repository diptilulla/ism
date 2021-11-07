var express          =require("express");
var router           =express.Router();
var passport         =require("passport");
var User            =require("../models/user");

router.get('/users', function(req, res) {
    res.json({ currentUser: req.user });
});
router.get("/register/new",function(req,res){
    res.render("register");

});
router.get("/register",function(req,res){
   var name=req.query.name;
   var sname=req.query.sname;
   var email_id=req.query.email_id;
   var username=req.query.username;
   var password=req.query.password;

    var newBooking=new User({name:name,sname:sname,email_id:email_id,username:username})

    
    User.register(newBooking,password,function(err,user){

    
    if(err){
        console.log(err)
        return res.render("register")
    }
      console.log(user)      
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
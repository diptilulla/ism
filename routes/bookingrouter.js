var express          =require("express");
var router           =express.Router();
var Booking            =require("../models/booking");

router.get("/booking/new",function(req,res){
    res.render("book");

});
router.post("/booking",function(req,res){
   var fname=req.body.fname;
   var  lname=req.body.lname;
   
    // var author={
    //  id:req.user._id,
    //  username:req.user.username
    // }

    var newBooking={fname:fname,lname:lname}
    
    
    Booking.create(newBooking,function(err,newlyCreated){

    
    if(err){
        console.log("error")
    }
    else{
        console.log(newlyCreated);
        res.redirect("/")
        
    }
});

});
module.exports=router;
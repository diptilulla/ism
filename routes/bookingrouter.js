var express          =require("express");
var router           =express.Router();
var Booking            =require("../models/booking");
var middleware       =require("../middleware/middleware");  

router.get("/booking/new",middleware.isLoggedIn,function(req,res){
    res.render("book");

});
router.post("/booking",function(req,res){
  
    var train=req.body.train;
    var date=req.body.date;
 
    var from=req.body.from;
    var to=req.body.to;
    var num_ppl=req.body.num_ppl;
    
    var owner={
     id:req.user._id,
     username:req.user.username
    }

    var newBooking={train:train,date:date,from:from,to:to,num_ppl:num_ppl,owner:owner}
    
    
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
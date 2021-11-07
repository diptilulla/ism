var express          =require("express");
var router           =express.Router();
var Booking            =require("../models/booking");
var middleware       =require("../middleware/middleware");  
var fs = require('fs');


router.get("/booking/new",middleware.isLoggedIn,function(req,res){
  
fs.readFile('./trains.json', 'utf8', function (err, data) {
  if (err) throw err;
  var obj = JSON.parse(data);

    res.render("book",{d:obj});
});

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
        res.render("show",{s:newlyCreated})
        
    }
});

});



router.get("/bookings/:id",middleware.isLoggedIn,function(req,res){
    Booking.find({"owner.id":req.params.id},function(err,found){
        if(err){
            res.redirect("/")
            console.log(err)
        }
        else{
            res.render("bookings",{f:found});
            console.log(req.params.id);
           
        }
    })
})


router.post("/bookings/:id",middleware.checkOwnership,function(req,res){
    Booking.findByIdAndRemove({_id:req.params.id},function(err){
      if(err){
          res.redirect("/");
          console.log(err)
      }
      else{
          res.redirect("/")
      }
    })
})
module.exports=router;
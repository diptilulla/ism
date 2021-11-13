var express          =require("express");
var router           =express.Router();
var Booking           =require("../models/booking");
var User             =require("../models/user")
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
    var dept=req.body.dept;
    var arr=req.body.arr;
    var from=req.body.from;
    var to=req.body.to;
    var num_ppl=req.body.num_ppl;
    var cost=100*num_ppl;
    var owner={
     id:req.user._id,
     username:req.user.username
    }

    var newBooking={train:train,date:date,from:from,to:to,num_ppl:num_ppl,cost:cost,owner:owner}
    
    
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
router.get("/user",middleware.isLoggedIn,function(req,res){
    res.render("find")
})

router.get("/finduser",middleware.isLoggedIn,function(req,res){
    var username=req.query.username
    console.log(username)
    query = { $where:`this.username == '${username}'` }
User.find(query, function (err, users) {
	if (err) {
		res.redirect("/");
          console.log(err)
	} else {
		res.render('result', { users: users });
        console.log(users)
	}
});
});
module.exports=router;

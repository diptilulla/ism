var mongoose=require('mongoose')
var BookingSchema=new mongoose.Schema({

  train:String,
  date:{type:Date},
  from:String,
  to:String,
  num_ppl:{type:Number},
  cost:{type:Number}


});
module.exports=mongoose.model("Booking",BookingSchema);
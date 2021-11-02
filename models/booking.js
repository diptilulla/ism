var mongoose=require('mongoose')
var BookingSchema=new mongoose.Schema({
  fname:String,
  sname:String,
  train:String,
  date:{type=Date},
  from:String,
  to:String,
  num_ppl:{type:Number},
  cost:{type:Number},
  date:String


});
module.exports=mongoose.model("Booking",BookingSchema);
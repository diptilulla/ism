var mongoose=require('mongoose')
var BookingSchema=new mongoose.Schema({

  train:String,
  date:{type:Date},
  from:String,
  to:String,
  num_ppl:{type:Number},
  cost:{type:Number},
  owner:{
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    username:String
    
},


});
module.exports=mongoose.model("Booking",BookingSchema);
var express             =require("express"),
 mongoose               =require("mongoose"),
 bodyParser             =require("body-parser"),
 app                    =express()

 mongoose.connect("mongodb://localhost/train");

app.set("view engine","ejs");
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended:true}));

var bookroute=require("./routes/bookingrouter")
var authroute=require("./routes/auth")


app.get("/",function(req,res){
    res.render("home");
})
app.use(bookroute);
app.use(authroute)
app.listen(process.env.PORT||2000,function(){
    console.log("running");
});

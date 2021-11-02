var express             =require("express"),
 mongoose               =require("mongoose"),
 bodyParser             =require("body-parser"),
 app                    =express()

app.set("view engine","ejs");
app.use(express.static('./public'))

app.get("/",function(req,res){
    res.render("home");
})

app.listen(process.env.PORT||2000,function(){
    console.log("running");
});

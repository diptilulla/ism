var express             =require("express"),
 mongoose               =require("mongoose"),
 bodyParser             =require("body-parser"),
 passport               =require("passport"),
 LocalStrategy          =require("passport-local"),
 passportLocalMongoose  =require("passport-local-mongoose"),
 User                   =require("./models/user"),
 app                    =express()

 mongoose.connect("mongodb://localhost/train");


// const uri = "mongodb+srv://aku:%23Titanium10@cluster0.t727p.mongodb.net/Train?retryWrites=true&w=majority";
// mongoose.connect(uri)



app.set("view engine","ejs");
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended:true}));

var bookroute=require("./routes/bookingrouter")
var authroute=require("./routes/auth")


app.use(require("express-session")({
    secret:"COOOOOL COOOOL COOOL",
    resave:false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 

mongoose.Promise=global.Promise;



app.use(function(req,res,next){
    res.locals.currentuser=req.user;
    next();
});



app.get("/",function(req,res){
    res.render("home",{currentuser:req.user});
})

app.use(bookroute);
app.use(authroute);

app.listen(process.env.PORT||2000,function(){
    console.log("running");
});

var express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  User = require("./models/user"),
  app = express();
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));

var bookroute = require("./routes/bookingrouter");
var authroute = require("./routes/auth");

// var RateLimit = require("express-rate-limit");

// const apiRequestLimiter = RateLimit({
//   windowMs: 1 * 60 * 1000, // 1 minute
//   max: 5 // limit each IP to 5 requests per windowMs
// });

// // Use the limit rule as an application middleware
// app.use(apiRequestLimiter);

app.use(
  require("express-session")({
    secret: "COOOOOL COOOOL COOOL",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.Promise = global.Promise;

app.use(function (req, res, next) {
  res.locals.currentuser = req.user;
  next();
});

// let logins = {};

// app.get("/", function (req, res) {
//   const etag = req.headers["if-none-match"];
//   let user = null;
//   if (req.headers.cookie) {
//     user = req.headers["cookie"].split("=")[1];
//     createUserfromEtag(etag, user);
//   } else {
//     user = getUserFromEtag(etag);
//     if (user) {
//       res.setHeader("set-cookie", [`user=${user}`]);
//     }
//   }
//   res.render("home", {
//     currentuser: user
//   });
// });

// function createUserfromEtag(etag, user) {
//   logins[etag] = user;
// }

// function getUserFromEtag(etag) {
//   return logins[etag];
// }
app.get("/", function (req, res) {
  res.render("home", {
    currentuser: req.headers["cookie"]
      ? req.headers["cookie"].split("=")[1]
      : null
  });
});
app.use(bookroute);
app.use(authroute);

//  mongoose.connect("mongodb://localhost/train");
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() =>
    app.listen(process.env.PORT || 2000, () => console.log("Server running"))
  )
  .catch((err) => console.log(err.message));

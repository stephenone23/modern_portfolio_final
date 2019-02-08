var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
var session = require("express-session");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CONSUMER_KEY = require("./config/keys").clientid;
const GOOGLE_CONSUMER_SECRET = require("./config/keys").secret;
const BASE_URL = require("./config/keys").baseURL;

let ejs = require("ejs");
ejs.open = "{{";
ejs.close = "}}";

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var portfolioRouter = require("./routes/portfolio");
var skillsRouter = require("./routes/skills");

var app = express();

// view engine setup
app.engine("html", ejs.renderFile);
app.set("views", path.join(__dirname, "public/dist"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/img", express.static(__dirname + "/public/dist/img"));
app.use("/css", express.static(__dirname + "/public/dist/css"));
app.use("/js", express.static(__dirname + "/public/dist/js"));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/portfolio", portfolioRouter);
app.use("/skills", skillsRouter);

app.use(
  session({ secret: "something somethingelse", cookie: { maxAge: 60000 } })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CONSUMER_KEY,
      clientSecret: GOOGLE_CONSUMER_SECRET,
      callbackURL: BASE_URL + "auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      passport.session.profile = profile;
      console.log(profile);
      return done(null, profile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"]
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function(req, res) {
    res.redirect("/");
  }
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

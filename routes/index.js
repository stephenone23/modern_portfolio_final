var express = require("express");
var router = express.Router();
var path = require("path");
var passport = require("passport");
const ADMIN_ID = require("../config/keys").googleadminid;

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index.html", {
    passportsession: passport.session.profile ? passport.session.profile : "",
    adminid: ADMIN_ID,
    current: "/"
  });
});

router.get("/about.html", function(req, res, next) {
  res.render("about.html", {
    passportsession: passport.session.profile ? passport.session.profile : "",
    current: "about"
  });
});

router.get("/skills.html", function(req, res, next) {
  res.render("skills.html", {
    passportsession: passport.session.profile ? passport.session.profile : "",
    current: "skills"
  });
});

router.get("/contact.html", function(req, res, next) {
  res.render("contact.html", {
    passportsession: passport.session.profile ? passport.session.profile : "",
    current: "contact"
  });
});

router.get("/work.html", function(req, res, next) {
  res.render("work.html", {
    passportsession: passport.session.profile ? passport.session.profile : "",
    current: "work"
  });
});

module.exports = router;

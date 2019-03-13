var express = require("express");
var router = express.Router();
var mongodb = require("mongodb");
var MongoClient = require("mongodb").MongoClient;
const mongouri = require("../config/keys").MongoURI;
var passport = require("passport");
const ADMIN_ID = require("../config/keys").googleadminid;

router.all("/", function(req, res, next) {
  MongoClient.connect(mongouri, function(err, db) {
    if (err) {
      console.log(err);
    } else {
      var dbo = db.db("test");
      dbo
        .collection("prospect")
        .find()
        .toArray(function(err, result) {
          if (err) throw err;
          res.json(result);
          db.close();
        });
    }
  });
});

router.all("/saveName", function(req, res, next) {
  if (passport.session.profile && passport.session.profile.id == ADMIN_ID) {
    MongoClient.connect(mongouri, function(err, db) {
      var dbo = db.db("test");
      var newvalues = { $set: { name: req.body.name } };
      dbo
        .collection("prospect")
        .update({ _id: new mongodb.ObjectID(req.body.id) }, newvalues, function(
          err,
          result
        ) {
          if (err) throw err;
          db.close();
        });
    });
  } else {
    res.redirect("/");
  }
});

router.all("/saveTagline", function(req, res, next) {
  if (passport.session.profile && passport.session.profile.id == ADMIN_ID) {
    MongoClient.connect(mongouri, function(err, db) {
      var dbo = db.db("test");
      var newvalues = { $set: { tagline: req.body.tagline } };
      dbo
        .collection("prospect")
        .update({ _id: new mongodb.ObjectID(req.body.id) }, newvalues, function(
          err,
          result
        ) {
          if (err) throw err;
          db.close();
        });
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;

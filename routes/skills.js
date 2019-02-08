var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
const mongouri = require("../config/keys").MongoURI;

router.all("/", function(req, res, next) {
  MongoClient.connect(mongouri, function(err, db) {
    var dbo = db.db("modern_portfolio");
    dbo
      .collection("skills")
      .find()
      .toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
        db.close();
      });
  });
});

module.exports = router;

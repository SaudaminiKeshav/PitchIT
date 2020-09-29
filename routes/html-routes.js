var path = require("path");
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");


// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {

    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    // if (req.user) {
    //   res.redirect("/members");
    // }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    // if (req.user) {
    //   res.redirect("/members");
    // }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/gallery", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/gallery.html"));
  });

  app.get("/dashboard", function(req, res) {
    db.Adventure.findAll({}).then(function(data) {
        var hbsObject = {
            adventures: JSON.stringify(data)
        };

        hbsObject = JSON.parse(hbsObject.adventures);
        newData = JSON.stringify(data);
        //console.log("origial data", data);
        thirdData = JSON.parse(newData); //produces all data
        //console.log("third", thirdData);

        if (hbsObject.length == 0) {
          console.log("nothing");
        } else {
          hbsObject = {
            thirdData
          };
          //console.log("object", hbsObject);
        }
        res.render("index", hbsObject);
    });
  });

  app.get("/dashboard", function(req, res) {
    db.User.findAll({}).then(function(dbUser) {
        var hbsObject = {
            user: dbUser
        };
        console.log("object", hbsObject);
        res.render("index", hbsObject);
    });
  });

  app.get("/create", function(req, res) {
    db.User.findAll({}).then(function(dbUser) {
        var hbsObject = {
            user: dbUser
        };
        console.log("object", hbsObject);
        res.render("create-block", hbsObject);
    });
  });
};
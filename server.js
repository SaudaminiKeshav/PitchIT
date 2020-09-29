// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");
var nodemailer = require('nodemailer');

var app = express();
var PORT = process.env.PORT || 8080;
var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

var { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
var exphbs = require("express-handlebars");
var Handlebars = require('handlebars');

app.engine('handlebars', exphbs({
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

//app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

require("./routes/html-routes.js")(app);
require("./routes/post-api-routes.js")(app);

db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log("🌎 App listening on PORT " + PORT);
  });
});

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pitch.it.devs@gmail.com',
    pass: 'TestPassword123'
  }
});

app.use(transporter.sendMail);
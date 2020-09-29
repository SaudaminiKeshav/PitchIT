var db = require("../models");
var passport = require("../config/passport");
var nodemailer = require("../config/transporter");
module.exports = function (app) {

    var userEmail = "";
    var username = "";

    //API ROUTES TO RENDER ON DASHBOARD
    app.get("/dashboard", function (req, res) {
        db.Adventure.all(function (data) {
            var handleBarsObject = {
                adventures: data
            };
            res.render("index", handleBarsObject);
        });
    });
    //API ROUTES TO RENDER ON DASHBOARD


    //API ROUTE TO SAVE ALL PARK INFO
    // app.post("/api/parks", function(req, res) {
    //     console.log(req.body);
    //     db.Nationalpark.create({
    //         parkcode: req.body.parkcode,
    //         name: req.body.name,
    //         state: req.body.state,
    //         image0: req.body.image0,
    //         infoUrl: req.body.infoUrl
    //     }).then(function () {
    //         console.log("park added to db!");
    //         //res.json(req);
    //     })
    //     .catch(function (err) {
    //         //res.status(401).json(err);
    //         console.log("error in routes file");
    //     });
    // });

    //API ROUTE TO SAVE ALL PARK INFO

    //SIGNUP/LOGIN/LOGOUT ROUTES
    app.post("/api/signup", function (req, res) {

        db.User.create({
            name: req.body.name,
            number: req.body.number,
            email: req.body.email,
            password: req.body.password
        })
            .then(function () {
                console.log("here###########");
                userEmail = req.body.email;
                username = req.body.name;
                sendSignupEmail(req.body.email)
                res.redirect(307, "/api/login");
            })
            .catch(function (err) {
                res.status(401).json(err);
            });
    });

    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json(req.user);
    });

    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });
    //SIGNUP/LOGIN/LOGOUT ROUTES


    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function (req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                email: req.user.email,
                id: req.user.id
            });
        }
    });
    // Route for getting some data about our user to be used client side

    //REVIEW API ROUTES
    app.put("/api/review/:id", function (req, res) {

        // console.log(req);
        // console.log(req.body);
        db.Adventure.update(
            { review: req.body.review },
            { where: { id: req.body.id } }

            //     {
            //     review: req.body.review,
            // },
            //    {
            //     where: {
            //         id: req.body.id
            //     }
        ).then(function (result) {
            if (result.changedRows == 0) {
                console.log("no changes made");
                return res.status(404).end();
            } else {
                console.log("review added");
                res.status(200).end();
            }
        });
    });
    //REVIEW API ROUTES


    //ADVENTURE API ROUTES
    app.post("/api/trips", function (req, res) {
        db.Adventure.create({
            title: req.body.title,
            date: req.body.date,
            location: req.body.location,
            campers: req.body.campers,
            items: req.body.items,
            completed: req.body.completed,
            review: req.body.review,
            parkImgUrl: req.body.parkImgUrl,
            parkWebUrl: req.body.parkWebUrl
        }).then(function () {
            sendTripEmail(username, userEmail, req.body.title, req.body.date, req.body.location, req.body.campers, req.body.items, req.body.completed, req.body.review);
            console.log("saved trip");

        }).catch(function (err) {
            console.log("error in routes file");
        });
    });

    app.put("/api/trips/:id", function (req, res) {
        db.Adventure.update({
            completed: req.body.completed
        }, {
            where: {
                id: req.body.id
            }
        }).then(function (result) {
            if (result.changedRows == 0) {
                console.log("no changes made");
                return res.status(404).end();
            } else {
                console.log("changed to completed");
                res.status(200).end();
            }
        });
    });

    app.delete("/api/trips/:id", function (req, res) {
        db.Adventure.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbAdventure) {
            res.json(dbAdventure);
        });
    });
    //ADVENTURE API ROUTES
}

async function sendSignupEmail(email) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        auth: {
            user: 'pitch.it.devs@gmail.com',
            pass: 'TestPassword123'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: 'pitch.it.devs@gmail.com',
        to: email,
        subject: "test",
        html: `
        <img src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80">
        <br><h2>Welcome to the Pitch It!</h2><br>
        <h2>You've found a community of travelers that are just like you.</h2>
        <h2>We don't want to be stuck in tourist traps that isolate us from vibrant, local experiences. We want to discover the hidden gems and less-traveled roads of our next destination.</h2>
        <h2>Ready for your next authentic travel experience?</h2>
        `
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("email sent");
        }
    })
}


async function sendTripEmail(username, userEmail, title, date, location, campers, items, completed, review) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        auth: {
            user: 'pitch.it.devs@gmail.com',
            pass: 'TestPassword123'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: 'pitch.it.devs@gmail.com',
        to: userEmail,
        subject: "test",
        html: `
        <img src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80">
        <br><h2>Here is a summary of the trip you created!</h2><br>
        <ul>
        <li> <h2>Title: ${title}</h2></li>
        <li> <h2>Date: ${date}</h2></li>
        <li> <h2>Location: ${location}</h2></li>
        <li> <h2>Campers: ${campers}</h2></li>
        <li><h2> Items: ${items}</h2></li>
        <li><h2> Completed: ${completed}</h2></li>
        <li> <h2>Review: ${review}</h2></li>
        </ul>
        `
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("email sent");
        }
    })
}
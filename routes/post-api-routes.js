var db = require("../models");
var passport = require("../config/passport");
var sgMail = require("../config/sendgrid");

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
    var count = 1;
    sgMail.setApiKey("");
    const msg = {
        to: email,
        from: 'pitch.it.devs@gmail.com', // Use the email address or domain you verified above
        templateId: ""
    };
    //ES6
    if (count == 1) {
        await sgMail
            .send(msg)
            .then(() => {
                count++;
            }, error => {
                console.error(error);

                if (error.response) {
                    console.error(error.response.body)
                }
            });
        //ES8
        (async () => {
            try {
                await sgMail.send(msg);
            } catch (error) {
                console.error(error);

                if (error.response) {
                    console.error(error.response.body)
                }
            }
        })();
    }
}


async function sendTripEmail(username, userEmail, title, date, location, campers, items, completed, review) {

    await sgMail.setApiKey("");
    const msg = {
        to: userEmail,
        from: 'pitch.it.devs@gmail.com', // Use the email address or domain you verified above
        templateId: "",
        dynamic_template_data: {
            name: username,
            title: title,
            date: date,
            location: location,
            campers: campers,
            items: items,
            completed: completed,
            review: review
        }
    }

    //ES6
    sgMail
        .send(msg)
        .then(() => {
            console.log("Trip email sent***");
        }, error => {
            console.error(error);

            if (error.response) {
                console.error(error.response.body)
            }
        });
    //ES8
    (async () => {
        try {
            await sgMail.send(msg);
        } catch (error) {
            console.error(error);

            if (error.response) {
                console.error(error.response.body)
            }
        }
    })();
}
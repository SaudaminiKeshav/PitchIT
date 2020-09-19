var db = require("../models");

module.exports = function(app) {
    app.get("/api/adventures", function(req, res) {
        db.Adventure.findAll({}).then(function(dbAdventure) {
            res.json(dbAdventure);
        });
        // var query = {};
        // if (req.query.author_id) {
        //     query.AuthorId = req.query.author_id;
        // }
        // db.Post.findAll({
        //     where: query,
        //     include: [db.Author]
        // }).then(function(dbPost) {
        //     res.join(dbPost);
        // });
    });

    // app.get("/api/posts/:id", function(req, res) {
    //     db.Post.findOne({
    //         where: {
    //             id: req.params.id
    //         },
    //         include: [db.Author]
    //     }).then(function(dbPost) {
    //         res.json(dbPost);
    //     });
    // });

    app.post("/api/adventures", function(req, res) {
        db.Adventure.create({
            title: req.body.title,
            date: req.body.date,
            location: req.body.location,
            campers: req.body.campers,
            items: req.body.items
        }).then(function(dbAdventure) {
            res.json(dbAdventure);
        })
    });

    app.delete("/api/adventures/:id", function(req, res) {
        db.Adventure.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbAdventure) {
            res.json(dbAdventure);
        });
    });

    app.put("/api/adventures", function(req, res) {
        db.Adventure.update({
            title: req.body.title,
            date: req.body.date,
            location: req.body.location,
            campers: req.body.campers,
            items: req.body.items
        },
        {
            where: {
                id: req.body.id
            }
        }).then(function(dbAdventure) {
            res.json(dbAdventure);
        }).catch(function(err) {
            res.json(err);
        })
    });
};
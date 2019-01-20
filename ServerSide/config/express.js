"use strict";

console

const
    express = require('express'),
    config = require('./config'),
    glob = require('glob'),
    cors = require('cors'),
    path = require('path'),
    jwt = require('express-jwt'),
    mongoose = require('mongoose');

module.exports = (app, io) => {
    app.use(cors());
    mongoose.connect(config.db.connectionString, {useCreateIndex: true,
        useNewUrlParser: true}, (err) => {
        if (err) return console.log(err);
        console.log("connected to database");
    });


	// Globbing through the routes
	let rootPath  = path.normalize( __dirname + '/..' );

    let routes = glob.sync(rootPath + '/routes/**/*.js');
    routes.forEach(route => { 
		console.log(route);
        require(route)(app, io);
    });

    // for unmatched routes
    app.use((req, res) => {
        res.status(404).send('route not found');
    });
}
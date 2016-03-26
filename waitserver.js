
var config = require('./app/config');

// Set up db
var mongoose = require('mongoose');
var db = mongoose.connect(config.db);

require('./app/model');

// Set up app
var express = require('express'),
    bodyParser = require('body-parser'),
	routes = require('./app/routes');

var app = express();

// Set up static things
app.use(express.static(__dirname + '/public/'));
app.set('views', './app/views');
app.set('view engine', 'jade');

/* REQUESTS */

// Form parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Our routes
routes.setup(app);

// Email sending cron job
var CronJob = require('cron').CronJob;

// Runs at 12 noon every day
new CronJob('00 00 12 * * *', function() {
	routes.sweepCapsules();
}, null, true, null, null, true);

// Start!
app.listen(config.port);

// Used for testing
module.exports = app;

console.log("Howdy! There's a server running at http://localhost:" + config.port);
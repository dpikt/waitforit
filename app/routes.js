// Routes
var Capsule = require('mongoose').model('capsules'),
    mailer = require('./mailer');

exports.setup = function (app) {
    app.route('/generate')
        .post(
            function (req, res) {
                var email = req.body.email;
                var date = new Date(req.body.date);

                var password = Math.random().toString(36).slice(-16);

                if (!email || !date) {
                    res.status(400).send("Must include email and date attributes!");
                    return;
                }   

                newCapsule = new Capsule({email: email, password: password, date: date});
                newCapsule.save(function(err, capsule) {
                    if (err) {
                        res.status(500).send(err.message);
                    } else {
                        res.json(capsule);
                    }
                });
            }
        );

    // Test mailing
    app.route('/send')
        .get(
            function (req, res) {
                mailer.sendCapsule({'email': 'dpikt@yahoo.com', 'password': 'testPass', 'date': 'date'}, function (err) {
                    if (err) {
                        res.status(500).send("Email did not send.");
                    } else {
                        res.send("Mail sent.");
                    }
                });
            }
        );

    app.route('/*')
        .get(
            function (req, res) { 
                res.render('index.jade');
             }
        );
}


exports.sweepCapsules = function () {
    // Time, what does it all mean?
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Get all capsules for today
    Capsule.find({"date": {$gte: today, $lt: tomorrow}}, function (err, capsules) {
        if (!err) {
            for (var i = 0; i < capsules.length; i++) {
                mailer.sendCapsule(capsules[i]);
            }
        } else {
            console.log(err);
        }
    });
}





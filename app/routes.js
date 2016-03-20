// Routes
var Capsule = require('mongoose').model('capsules'),
    mailer = require('./mailer');

exports.setup = function (app) {
    app.route('/generate')
        .post(
            function (req, res) {
                var email = req.body.email;
                var date = req.body.date;
                var password = Math.random().toString(36).slice(-8);

                if (!email || !date || !password) {
                    res.status(400).send("Must include email, date, and password attributes!");
                    return;
                }   

                newCapsule = new Capsule({email: email, password: password, date: date});
                newCapsule.save(function(err, user) {
                    if (err) {
                        res.status(500).send(err.message);
                    } else {
                        res.send("complete yo");
                    }
                });
            }
        );

    // Test mailing
    app.route('/send')
        .get(
            function (req, res) {
                mailer.sendMail({'email': 'dpikt@yahoo.com', 'password': 'testPass', 'date': 'date'}, function (err) {
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
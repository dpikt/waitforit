var nodemailer = require('nodemailer'),
	config = require('./config');

var mailer = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: config.emailAuth
});

exports.sendCapsule = function (capsule, callback) {
	options = {
		subject: "Your password has arrived",
		html: "Here's your password: " + capsule.password,
		to: capsule.email
	}
	mailer.sendMail(options, function(err) {
		if (callback) callback(err);
	});
}
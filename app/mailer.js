var nodemailer = require('nodemailer');

var mailer = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "waitforit624",
        pass: "gregsback"
    }
});

exports.sendMail = function (capsule, callback) {
	options = {
		subject: "Your password has arrived",
		html: "Here's your password: " + capsule.password,
		to: capsule.email
	}
	mailer.sendMail(options, function(err) {
		callback(err);
	});
}
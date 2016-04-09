$(document).ready(function() {

	/* UI INTERACTIONS */

	$("#generateButton").click(function () {

 		var email = $("#emailInput").val();
 		var date = $("#dateInput").val();
 		console.log(date);
	 	if (!(email.length > 0 && date.length > 0)) {
	 		flashError("Must enter an email and a date.");
		} else if (!validateEmail(email)) {
		 	flashError("Invalid email format.");
		} else {
	 		generate(email, date);
	 	}
	});

	$("#copy-pass").click(function () {
		copyToClipboard(gPassword);
	});

	$("#show-pass").click(function () {
		toggleShowPass();
	});

	/* ACTIONS */

	function generate(email, date) {
		date = new Date(date);
		post('/generate', {"email": email, "date": date}, function (response) {
			flashInfo("Password generated!");
			$("#password-section").show();
			gPassword = response.password;
		});
	}

});

/* GLOBALS */

var gShowPass = false;
var gPassword = "";

/* UI HELPERS */

function flashError(message) {
	$("#error-flash").addClass("error");
	$("#error-flash").removeClass("info");
	$("#error-flash").text(message);
}

function flashInfo(message) {
	$("#error-flash").addClass("info");
	$("#error-flash").removeClass("error");
	$("#error-flash").text(message);
}

function toggleShowPass() {
	gShowPass = !gShowPass;

	if (gShowPass) {
		$("#password-view").text(gPassword);
	} else {
		$("#password-view").text("••••••••••••••••");
	}
}

/* HELPERS */

function post(path, data, callback) {
	$.ajax({
		url: path, 
	 	type: "POST", 
	 	data: JSON.stringify(data),
 		contentType: "application/json",
        dataType: "json",
	 	success: callback,
	 	error: function (e) {
	 		flashError(e.responseText);
	 	}
	});
}

// http://stackoverflow.com/a/30905277
function copyToClipboard(text) {
    var $temp = $("<input>")
    $("body").append($temp);
    $temp.val(text).select();
    document.execCommand("copy");
    $temp.remove();
}

function validateEmail (email) {
    var re = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    return re.test(email);
}
/* GLOBALS */

var gShowPass = false;
var gSectionToggle = false;
var gPassword = "test";

$(document).ready(function() {

	/* UI INTERACTIONS */

	$("#generateButton").click(function () {
 		var email = $("#emailInput").val();
 		var date = $("#dateInput").val();

	 	if (!(email.length > 0 && date.length > 0)) {
	 		flashError("Must enter an email and a date.");
		} else if (!validateEmail(email)) {
		 	flashError("Invalid email format.");
		} else {
	 		generate(email, date);
	 	}
	});

	$("#copyButton").click(function () {
		var success = copyToClipboard(gPassword);
		if (success) {
    		flashInfo("Copied to clipboard!");
    	} else {
    		flashError("Copy failed, please copy manually.");
    	}
	});

	$("#showButton").click(function () {
		toggleShowPass();
	});

	$("#infoLink").click(function () {
		alert("This will link to more info ;)");
	});

	/* ACTIONS */

	function generate(email, date, callback) {
		date = new Date(date);
		post('/generate', {"email": email, "date": date}, function (response) {
			gPassword = response.password;
			toggleSections(function () {
				flashInfo("Password generated!");
			});
		});
	}

});

/* UI HELPERS */

function flashError(message) {
	$("#errorFlash").addClass("error");
	$("#errorFlash").removeClass("info");
	flash(message);
}

function flashInfo(message) {
	$("#errorFlash").addClass("info");
	$("#errorFlash").removeClass("error");
	flash(message);
}

function flash(message) {
	$("#errorFlash").text(message);
	$("#errorFlash").fadeIn(400, function () {
		setTimeout(function () {
			$("#errorFlash").fadeOut(800);
		}, 800);
	});
}

function toggleSections(callback) {
	gSectionToggle = !gSectionToggle;
	if (gSectionToggle) {
		$("#generateSection").fadeOut(400, function () {
			$("#passwordSection").fadeIn(400, callback);
		});
	} else {
		$("#passwordSection").fadeOut(400, function () {
			$("#generateSection").fadeIn(400, callback);
		});
	}
}

function toggleShowPass() {
	gShowPass = !gShowPass;
	if (gShowPass) {
		$("#passwordField").val(gPassword);
		$("#showButton").text("Hide");
	} else {
		$("#passwordField").val("••••••••••••••••");
		$("#showButton").text("Show");
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
    var success = document.execCommand("copy");
    $temp.remove();
    return success;
}

function validateEmail (email) {
    var re = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    return re.test(email);
}
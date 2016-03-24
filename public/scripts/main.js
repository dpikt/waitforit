$(document).ready(function() {

	/* UI INTERACTIONS */

	$("#generateButton").click(function () {

 		var email = $("#emailInput").val();
 		var date = $("#dateInput").val();

	 	if (email.length > 0 && date.length > 0) {
		 	generate(email, date);
	 	} else {
	 		flash("Fill both the fields idiot");
	 	}
	});

	/* ACTIONS */

	function generate(email, date) {
		email = $.trim(email);
		console.log(email);
		date = new Date(date);
		date = date.toJSON();
		post('/generate', {"email": email, "date": date}, function (response) {
			flash(response);
		});
	}

});

/* UI HELPERS */

function flash(message) {
	$("#error-flash").text(message);
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
	 		flash(e.responseText);
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
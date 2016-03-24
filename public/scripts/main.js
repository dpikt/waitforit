$(document).ready(function() {

	// UI INTERACTION

	$("#generateButton").click(function () {

 		var email = $("#emailInput").val();
 		var date = $("#dateInput").val();

	 	if (email.length > 0 && date.length > 0) {
		 	flash("Generated");
	 	} else {
	 		flash("Fill both the fields idiot");
	 	}
	});

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
 		contentType: "application/json; charset=utf-8",
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
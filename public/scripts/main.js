$(document).ready(function(){

	// Form validation
	$("#generateButton").click(function () {
 		var email = $("#emailInput").val();
 		var date = $("#dateInput").val();
	 	if (email.length > 0 && date.length > 0) {
		 	$("#message").text("Generated");
	 	} else {
	 		$("#message").text("Fill both the fields idiot");
	 	}
	});

});
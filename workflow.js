var unirest = require("unirest");
var formatstring = require("formatstring");

unirest
	.post("https://api2.online-convert.com/jobs")
	.type("json")
	.header("X-Oc-Api-Key", "x")
	.send({
		"conversion": [{
			"target": "png"
		}]
	})
	.end(function(response) {
		var json = response.body;
		console.log(json);
		step2(json);
	});

function step2(json) {
	unirest
		.post(formatstring("{server}/upload-file/{id}", json))
		.header("X-Oc-Token", json.token)
		.header("X-Oc-Api-Key", "x")
		.attach("file", "city2.jpg")
		.end(function(response) {
			console.log(response.error);
			console.log("step3", response.body);
			step3(json, response.body);
		});
}

function step3(json, uploadres) {
	unirest
		//.get(formatstring("https://api2.online-convert.com/jobs/{id}/output", json))
		.get(formatstring("https://api2.online-convert.com/jobs/{id}", json))
		.type("json")
		.header("X-Oc-Api-Key", "x")
		.end(function(response) {
			console.log(response.error);
			console.log("step4", response.body);
			step4(response.body);
		});
}

function step4(json) {

}

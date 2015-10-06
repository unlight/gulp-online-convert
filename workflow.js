var unirest = require("unirest");
var formatstring = require("formatstring");

unirest
	.post("https://api2.online-convert.com/jobs")
	.type("json")
	.header("X-Oc-Api-Key", process.env.X_OC_API_KEY)
	.send({
		"conversion": [
			{"target": "svg"}
		]
	})
	.end(function(response) {
		var json = response.body;
		console.log("step1 end", json);
		step2(json);
	});

function step2(json) {
	unirest
		.post(formatstring("{server}/upload-file/{id}", json))
		.header("X-Oc-Token", json.token)
		.attach("file", "image1.png")
		.end(function(response) {
			console.log(response.error);
			console.log("step2 end", response.body);
			step3(json, response.body);
			setTimeout(step3.bind(null, json, response.body), 2000);
		});
}

function step3(json, uploadres) {
	unirest
		.get(formatstring("https://api2.online-convert.com/jobs/{id}/output", json))
		// .get(formatstring("https://api2.online-convert.com/jobs/{id}", json))
		.type("json")
		.header("X-Oc-Api-Key", process.env.X_OC_API_KEY)
		.end(function(response) {
			console.log(response.error);
			console.log("step3 end", response.body);
			step4(response.body);
		});
}

function step4(json) {

}

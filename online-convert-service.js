var unirest = require("unirest");
var basename = require("basename");
var formatstring = require("formatstring");

function OnlineConvertService(options) {
	this._apiKey = options.apiKey;
	if (!this._apiKey) throw new TypeError("API key is not specified, check http://api.online-convert.com/#requirements");
}

OnlineConvertService.prototype.createJob = function(data, callback) {
	var conversionTarget = data.conversion;
	var conversion = [{
		target: conversionTarget
	}];
	unirest
		.post("https://api2.online-convert.com/jobs")
		.type("json")
		.header("X-Oc-Api-Key", this._apiKey)
		.send({
			"conversion": conversion
		})
		.end(function(response) {
			if (response.error) {
				return callback(response.error);
			}
			callback(null, response.body);
		});

}

OnlineConvertService.prototype.uploadFile = function(data, files, callback) {
	var r = unirest
		.post(formatstring("{server}/upload-file/{id}", data))
		.header("X-Oc-Token", data.token)
		.header("X-Oc-Api-Key", this._apiKey)
		.end(function(response) {
			if (response.error) {
				return callback(response.error);
			}
			callback(null, response.body);
		});
	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		var name = formatstring("file_{id}", {
			id: i + 1
		});
		r.attach(name, file);
	}
}

module.exports = OnlineConvertService;
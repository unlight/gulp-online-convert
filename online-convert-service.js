var unirest = require("unirest");
var basename = require("basename");

function OnlineConvertService(options) {
	this._apiKey = options.apiKey;
	if (!this._apiKey) throw new TypeError("API key is not specified, check http://api.online-convert.com/#requirements");
}

OnlineConvertService.prototype.createJob = function(data, callback) {
	var conversionTarget = data.conversion;
	var conversion = [{
		target: conversionTarget
	}];
	var result = unirest
		.post("https://api2.online-convert.com/jobs")
		.type("json")
		.header("X-Oc-Api-Key", this._apiKey)
		.send({
			conversion: conversion
		})
		.end(function(response) {
			if (response.error) {
				return callback(response.error);
			}
			callback(null, response.body);
		});
	return result;
}

module.exports = OnlineConvertService;
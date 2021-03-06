var Transform = require("stream").Transform;
var OnlineConvertService = require("./online-convert-service");
var async = require("async");

OnlineConvert.prototype = Object.create(Transform.prototype);
OnlineConvert.prototype.constructor = OnlineConvert;

function OnlineConvert(options) {
	this._options = options || {};
	Transform.call(this, {
		objectMode: true
	});
	this._onlineConvert = new OnlineConvertService(this._options);
}

OnlineConvert.prototype._transform = function(data, encoding, callback) {
	if (!this._job) {
		this._job = true;
		this._onlineConvert.createJob({
			conversion: this._options.target
		}, function(err, job) {
			if (err) return callback(err);
		});
	}


	// });
	// async.waterfall([
	// 	function(next) {
	// 		this._onlineConvert.createJob({
	// 			conversion: this._options.target
	// 		}, next);
	// 	},
	// 	function(data, next) {
	// 		var files = [
	// 		];
	// 		this._onlineConvert.uploadFile();
	// 	}
	// ], function(err, results) {

	// });
	// this.push(data);
	callback();
}

OnlineConvert.prototype._flush = function(callback) {
	console.log("_flush", arguments);
	callback();
}

function createStream(data) {
	var options = {};
	if ("string" === typeof data) {
		options.target = data;
	}
	var envApiKeyName = data.envApiKeyName || "X_OC_API_KEY";
	options.apiKey = process.env[envApiKeyName];
	if (!options.target) throw new TypeError("Type of conversion is not specified.");
	if (!options.apiKey) throw new TypeError("API key is not specified, check http://api.online-convert.com/#requirements");

	var result = new OnlineConvert(options);
	return result;
}

module.exports = createStream;
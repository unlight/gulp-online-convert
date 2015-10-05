var unirest = require("unirest");
var basename = require("basename");

function OnlineConvertService(options) {
	this._apiKey = options.apiKey;
	if (!this._apiKey) throw new TypeError("API key is not specified, check http://api.online-convert.com/#requirements");
}

OnlineConvertService.prototype.createJob = function(data, callback) {
	var file = data.input;
	var conversionTarget = data.conversion;
	var filebasename = basename(file);
	var input = [{
		type: "upload",
		filename: filebasename
	}];
	var conversion = [{
		target: conversionTarget
	}];
	var attachObject = {};
	attachObject[filebasename] = file;
	var result = unirest
		.post("https://api2.online-convert.com/jobs")
		.type("json")
		.header("X-Oc-Api-Key", this._apiKey)
		.attach(attachObject)
		.end(function(response) {
			if (response.error) {
				return callback(response.error);
			}
			callback(null, response.body);
		});
}

// unirest.post('http://mockbin.com/request')
// .header('Accept', 'application/json')
// .field({
//   'parameter': 'value'
// })
// .attach({
//   'file': 'dog.png',
//   'relative file': fs.createReadStream(path.join(__dirname, 'dog.png')),
//   'remote file': unirest.request('http://google.com/doodle.png')
// })
// .end(function (response) {
//   console.log(response.body);
// })


module.exports = OnlineConvertService;
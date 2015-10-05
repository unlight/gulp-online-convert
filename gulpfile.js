var gulp = require("gulp");
// var onlineConvert = require("gulp-online-convert");
var onlineConvert = require("./");

gulp.task("convert", function() {
	gulp.src("./image.png", {read: false})
		.pipe(onlineConvert("svg"))

});

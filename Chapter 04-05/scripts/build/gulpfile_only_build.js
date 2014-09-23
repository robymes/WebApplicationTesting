/*global console*/

var gulp = require("gulp");

var concat = require("gulp-concat");
var jsLint = require("gulp-jslint");
var uglify = require("gulp-uglify");

var jsLintOptions = {
    browser: true,
    white: true,
    predef: ["jQuery", "JSON", "ko", "require", "postal", "alert"],
    sloppy: true,
    unparam: true,
    reporter: "default",
    errorsOnly: true
};

var paths = {
    src: [
        "../src/*.js"
    ]
};

gulp.task("release", function () {
    return gulp.src(paths.src)
        .pipe(jsLint(jsLintOptions))
        .pipe(concat("mytodo.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(".."));
});

gulp.task("debug", function () {
    return gulp.src(paths.src)
        .pipe(jsLint(jsLintOptions));
});

gulp.task("build", [
    "release",
    "debug"
]);

gulp.task("default", ["build"]);
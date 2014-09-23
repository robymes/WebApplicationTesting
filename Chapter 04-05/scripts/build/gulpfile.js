/*global console*/

var gulp = require("gulp");

var concat = require("gulp-concat");
var jsLint = require("gulp-jslint");
var uglify = require("gulp-uglify");
var karma = require("gulp-karma");

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
    ],
    testsRelease: [
        "../libs/jquery-1.11.1.min.js",
        "../libs/jquery-ui-1.10.4.custom.min.js",
        "../libs/conduit-0.3.2.min.js",
        "../libs/lodash-2.4.1.min.js",
        "../libs/postal-0.10.0.min.js",
        "../libs/bootstrap.min.js",
        "../libs/knockout-3.1.0.min.js",
        "../mytodo.min.js",
        "../tests/*_Specs.js"
    ],
    testsDebug: [
        "../libs/jquery-1.11.1.min.js",
        "../libs/jquery-ui-1.10.4.custom.min.js",
        "../libs/conduit-0.3.2.min.js",
        "../libs/lodash-2.4.1.min.js",
        "../libs/postal-0.10.0.min.js",
        "../libs/bootstrap.min.js",
        "../libs/knockout-3.1.0.min.js",
        "../src/*.js",
        "../tests/*_Specs.js"
    ]
};

gulp.task("release", function () {
    return gulp.src(paths.src)
        .pipe(concat("mytodo.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(".."));
});

gulp.task("debug", function () {
    return gulp.src(paths.src)
        .pipe(jsLint(jsLintOptions));
});

gulp.task("testsRelease", function () {
    return gulp.src(paths.testsRelease)
        .pipe(karma({
            configFile: "karma.release.js",
            action: "run"
        }));
});

gulp.task("testsDebug", function () {
    return gulp.src(paths.testsDebug)
        .pipe(karma({
            configFile: "karma.debug.js",
            action: "run"
        }));
});

gulp.task("build", [
    "debug",
    "testsDebug",
    "release",
    "testsRelease"
]);

gulp.task("default", ["build"]);
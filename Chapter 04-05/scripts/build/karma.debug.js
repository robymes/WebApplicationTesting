/*global module*/

module.exports = function (config) {
    config.set({
        basePath: "",
        frameworks: ["jasmine"],
        reporters: ["progress", "html", "coverage"],
        htmlReporter: {
            outputDir: "../tests/reports/debug",
            templatePath: __dirname + "/node_modules/karma-html-reporter/jasmine_template.html"
        },
        preprocessors: {
            "../src/*.js": ["coverage"]
        },
        coverageReporter: {
            type: "html",
            dir: "../tests/coverage/"
        },
        browsers: ["PhantomJS"],
        port: 9878,
        colors: true,
        logLevel: config.LOG_INFO,
        singleRun: true
    });
};

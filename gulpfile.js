const
    gulp   = require("gulp"),
    gutil  = require("gulp-util"),
    jshint = require("gulp-jshint"),
    mocha  = require("gulp-mocha");

gulp.task("default", ["jshint", "test"]);

gulp.task("jshint", function() {
    return gulp.src([
            "./lib/*.js",
            "./test/*.js"
        ])
        .pipe(jshint({
            esversion : 6,
            lastsemic : true, // suppresses warnings about missing semicolons when the semicolon is omitted for the last statement in a one-line block
            expr      : true  // suppresses warnings about the use of expressions where jshint would expect assignments or function calls
        }))
        .pipe(jshint.reporter("jshint-stylish"))
        .on('error', gutil.log);
});

gulp.task("test", function() {
    return gulp.src([
            "./test/option_test.js",
            "./test/some_test.js",
            "./test/none_test.js",
            "./test/lazy_option_test.js",
            "./test/functional_tests.js"
        ])
        .pipe(mocha({
            reporter: "spec"
        }))
        .on('error', gutil.log);
});

gulp.task("watch", ["jshint", "test"],function() {
    gulp.watch([
            "./lib/*.js",
            "./test/*.js"
        ], {
            interval: 500
        }, [
            "jshint",
            "test"
        ]);
});

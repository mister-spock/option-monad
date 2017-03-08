const
    gulp   = require("gulp"),
    util   = require("gulp-util"),
    jshint = require("gulp-jshint"),
    mocha  = require("gulp-mocha");

gulp.task("default", ["jshint", "test"]);

gulp.task("jshint", function() {
    return gulp.src([
            "./src/*.js",
            "./test/*.js"
        ])
        .pipe(jshint({
            esversion : 6,
            lastsemic : true, // suppresses warnings about missing semicolons when the semicolon is omitted for the last statement in a one-line block
            expr      : true  // suppresses warnings about the use of expressions where jshint would expect assignments or function calls
        }))
        .pipe(jshint.reporter("jshint-stylish"));
});

gulp.task("test", function() {
    return gulp.src("./test/*.js")
        .pipe(mocha({
            reporter: "spec"
        }))
        .on("error", util.log);
});

gulp.task("watch", ["jshint", "test"],function() {
    gulp.watch([
            "./src/*.js",
            "./test/*js"
        ], [
            "jshint",
            "test"
        ]);
});

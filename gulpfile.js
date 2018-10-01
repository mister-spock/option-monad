const
    gulp   = require("gulp"),
    gutil  = require("gulp-util"),
    jshint = require("gulp-jshint"),
    mocha  = require("gulp-mocha");

gulp.task("jshint", function() {
    return gulp.src([
            "./lib/*.js",
            "./test/*.js"
        ])
        .pipe(jshint({
            esversion : 6,
            lastsemic : true, // suppresses warnings about missing semicolons when the semicolon is omitted for the last statement in a one-line block
            expr      : true, // suppresses warnings about the use of expressions where jshint would expect assignments or function calls
            noyield   : true  // generator functions with "return" and no "yield" keyword are OK!
        }))
        .pipe(jshint.reporter("jshint-stylish"))
        .on('error', gutil.log);
});

gulp.task("test", function() {
    return gulp.src(["./test/*.js"])
        .pipe(mocha({
            reporter: "spec"
        }))
        .on('error', gutil.log);
});

gulp.task("default", gulp.parallel("jshint", "test"));

gulp.task("watch", function() {
    gulp.watch([
            "./lib/*.js",
            "./test/*.js"
        ], {
            interval: 500
        },
        gulp.parallel("jshint", "test")
    );
});

/**
 * Created by jonny on 2/5/15.
 */
/**
 * Allows us to auto-reload browser when developing frontend
 * To make this work run "gulp" (w/out the quotes) in terminal
 */


/**
 * Created by jonny on 2/5/15.
 */

var gulp = require('gulp');
  // plugins
//var connect = require('gulp-connect');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var less = require('gulp-less');
var webserver = require('gulp-webserver');

//gulp.task('connect', function(){
//    connect.server({
//        root: 'app/',
//        livereload: true,
//        port: 8000,
//        open: true
//    });
//});


gulp.task('js', function() {
    gulp.src('app/**/*')
});

gulp.task('html', function() {
    gulp.src('app/*.html')
});

gulp.task('css', function() {
    gulp.src('app/*.css')
});

gulp.task('watch', function() {
    gulp.watch('app/**/*', ['js']);
    gulp.watch('app/*.css', ['css']);
    gulp.watch(['app/*.html', 'app/recipes/*.html'], ['html']);
})

gulp.task('webserver', function() {
    gulp.src('app/')
        .pipe(webserver({
            livereload: true,
            open: true,
            port: 8000
            }));
});

gulp.task('default', ['watch', 'js', 'html', 'css', 'webserver']);
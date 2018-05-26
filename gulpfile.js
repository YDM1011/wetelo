var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var webserver = require('gulp-webserver');
var watch = require('gulp-watch');
var nodemon = require('gulp-nodemon');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

gulp.task('default', function () {
    gulp.src('./public/stylesheets/**/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
    return gulp.src('./public/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ["last 10 versions"]
        }))
        .pipe(gulp.dest('./public/stylesheets'))
});
gulp.task('start', function () {
    nodemon({
        script: 'server.js',
        ext: 'js html',
        env: { 'NODE_ENV': 'development' }
    })
});
gulp.task('watch', function () {
    gulp.watch(['./public/sass/**/*.sass'], ['sass'])
});
gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true,
            port: 8080
        }));
});
gulp.task('default', ['sass', 'watch', 'webserver']);
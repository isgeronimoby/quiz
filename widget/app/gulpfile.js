var gulp = require('gulp'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    wrap = require('gulp-wrap'),
    del = require('del'),
    rename = require("gulp-rename");


var scripts = ['js/init.js', 'js/easyXDM.min.js', 'js/vanilla-slider.js', 'js/moment.min.js', 'js/requests.js', 'js/helpers.js','js/templates.js', 'js/main.js', 'js/page-events.js', 'js/fillMethods.js', 'js/launch.js'];

gulp.task('scripts-min', function(){
    return gulp.src(scripts)
            .pipe(concat('widget.min.js'))
            .pipe(wrap("window.addEventListener('load', function(){\n<%= contents %>\n});"))
            .pipe(uglify())
            .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function(){
    return gulp.src(scripts)
            .pipe(concat('widget.js'))
            .pipe(wrap("window.addEventListener('load', function(){\n<%= contents %>\n});"))
            .pipe(gulp.dest('dist'));
});

gulp.task('styles', function(){
    return gulp.src('css/style.css')
            .pipe(cssnano({zindex: false}))
            .pipe(rename('style.min.css'))
            .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('css/*.css', ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);
gulp.task('build', ['scripts-min']);
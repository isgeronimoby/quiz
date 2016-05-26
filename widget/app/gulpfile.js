var gulp = require('gulp'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    wrap = require('gulp-wrap'),
    del = require('del'),
    rename = require('gulp-rename'),
    eol = require('gulp-eol');


var scripts = [
    // Creating DGW global object and initializing its parameters
    'js/init.js',

    // Proxy object
    'js/easyXDM.min.js',

    // Server and cookie requests
    'js/requests.js',

    // General helpers for the whole platform
    'js/helpers.js',

    // Templates
    'js/templates-side.js',
    'js/templates.js',

    // Initializing/creating main elements
    'js/dom-elements-side-init.js',
    'js/dom-elements-init.js',

    // General events and methods
    'js/general-methods.js',

    // Side widget event initializer
    'js/side-widget-events.js',

    // Page specific event initializer
    'js/pages/activities-events.js',
    'js/pages/draws-events.js',
    'js/pages/friends-events.js',
    'js/pages/login-events.js',
    'js/pages/profile-events.js',

    // Page specific constructors
    'js/pages/activities-constructor.js',
    'js/pages/games-constructor.js',
    'js/pages/draws-constructor.js',
    'js/pages/earn-constructor.js',
    'js/pages/friends-constructor.js',
    'js/pages/leaderboard-constructor.js',
    'js/pages/profile-constructor.js',

    // Common events and constructors
    'js/page-events.js',
    'js/page-constructors.js',

    // Offers methods
    'js/offers-requests.js',

    // Launcher
    'js/launch.js'
];

gulp.task('scripts-min', function(){
    return gulp.src(scripts)
            .pipe(concat('widget.min.js'))
            .pipe(wrap("window.addEventListener('load', function(){\n<%= contents %>\n});"))
            .pipe(uglify())
            .pipe(eol('\r\n'))
            .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function(){
    return gulp.src(scripts)
            .pipe(concat('widget.js'))
            .pipe(wrap("window.addEventListener('load', function(){\n<%= contents %>\n});"))
            .pipe(eol('\r\n'))
            .pipe(gulp.dest('dist'));
});

gulp.task('styles', function(){
    return gulp.src('css/style.css')
            .pipe(cssnano({zindex: false}))
            .pipe(rename('style.min.css'))
            .pipe(eol('\r\n'))
            .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('js/pages/*.js', ['scripts']);
    gulp.watch('css/*.css', ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);
gulp.task('build', ['scripts-min']);

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');

var concat = require('gulp-concat');
var template = require('gulp-underscore-template');
var watch = require('gulp-watch');
var jsmin = require('gulp-jsmin');

var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var handlebars = require('gulp-handlebars');

gulp.task('templates', function() {
    return watch('./templates/*', { ignoreInitial: false},function () {
        gulp.src('templates/**/*.hbs')
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            root: 'exports',
            noRedeclare: true, // Avoid duplicate declarations
            processName: function(filePath) {
                return declare.processNameByPath(filePath.replace('templates/', ''));
            }
        }))
        .pipe(concat('templates.js'))
        .pipe(wrap('var Handlebars = require("handlebars");\n <%= contents %>'))
        .pipe(gulp.dest('./src/utils'));
    });
});


gulp.task('css', function () {
    var less = require('gulp-less');
    var postcss = require('gulp-postcss');
    var postcssCssReset = require('postcss-css-reset');
    var autoprefixer = require('autoprefixer');

    return watch('./styles/*', { ignoreInitial: false},function () {
        gulp.src('./styles/*')
        // .pipe(postcss(processors))
        .pipe(less())
        .pipe(postcss([
            require('postcss-css-reset')({ /* options */ }),
            autoprefixer({ browsers: ['last 8 versions'] })
        ]))
        .pipe(gulp.dest('./dist/styles'));
    });
});

var customOpts = {
    entries: ['./src/app.js'],
    debug: true
    // debug: false
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

// add transformations here
// i.e. b.transform(coffeeify);

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
    return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // .pipe(jsmin())
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist'));
}


gulp.task('default',['templates','css','js']);

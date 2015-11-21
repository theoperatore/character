"use strict";

var gulp = require('gulp');

var uglify = require('gulp-uglify');
var stylus = require('gulp-stylus');
var minifyCss = require('gulp-minify-css');

var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');

var rename = require('gulp-rename');
var concat = require('gulp-concat');
var gutils = require('gulp-util');
var chalk = require('chalk');

var del = require('del');
var nib = require('nib');

function logError(err) {
  if (err.fileName) {
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
      + ': '
      + 'Line '
      + chalk.magenta(err.lineNumber)
      + ' & '
      + 'Column '
      + chalk.magenta(err.columnNumber || err.column)
      + ': '
      + chalk.blue(err.description))
  }
  else {
    gutils.log(chalk.red(err.name) + ": " + chalk.yellow(err.message));
  }

  this.end();
}


function bundle(bundler) {
  return bundler.bundle()
    .on('error', logError)
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('build'))
    // .pipe(rename('bundle.min.js'))
    // .pipe(sourcemaps.init({ loadMaps: true }))
    // .pipe(uglify())
    // .pipe(sourcemaps.write())
    // .pipe(gulp.dest('build'))
}


///////////////////////////////////////////////////////////////////////////////
//
// clean the build dir
//
///////////////////////////////////////////////////////////////////////////////
gulp.task('clean', function(cb) {
  del('./build', cb);
})


///////////////////////////////////////////////////////////////////////////////
//
// Compile JS
//
///////////////////////////////////////////////////////////////////////////////
gulp.task('compile-js', function() {
  var bundler = browserify('./src/ui/index.js').transform(babelify, {
    presets: [ 'stage-0', 'es2015', 'react' ],
    sourceMapRelative: '.'
  })

  bundler.on('file', function (file) {
    console.log(chalk.yellow('[file]'), chalk.gray(file));
  });

  return bundle(bundler);
})


///////////////////////////////////////////////////////////////////////////////
//
// Watch for js files to change, rebuild
//
///////////////////////////////////////////////////////////////////////////////
gulp.task('watch-js', function() {
  var args = watchify.args;
  args.debug = true;

  var brsfy = browserify('./src/ui/index.js', args);

  brsfy.on('file', function (file) {
    console.log(chalk.yellow('[file]'), chalk.gray(file));
  });

  var bundler = watchify(brsfy)
    .transform(babelify, {
      presets: ['stage-0', 'es2015', 'react'],
      sourceMapRelative: '.'
    });

  bundler.on('update', function (id) {
    bundle(bundler);
  })

  bundler.on('log', function (msg) {
    console.log(chalk.green('[watch]', msg));
  })

  return bundle(bundler);
})


///////////////////////////////////////////////////////////////////////////////
//
// Compile-CSS using stylus and nib
//
///////////////////////////////////////////////////////////////////////////////
gulp.task('compile-css', function() {
  return gulp.src('./src/ui/**/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({ 
      use : nib(), 
      import : ['nib', __dirname + '/src/ui/style/base']
    }))
    .on('error', logError)
    .pipe(concat('style.css'))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build'));
})


///////////////////////////////////////////////////////////////////////////////
//
// Watch for changes to styl files
//
///////////////////////////////////////////////////////////////////////////////
gulp.task('watch-css', ['compile-css'], function() {
  return gulp.watch(['src/ui/**/*.styl'], ['compile-css']);
})


///////////////////////////////////////////////////////////////////////////////
//
// Copy files into the correct place
//
///////////////////////////////////////////////////////////////////////////////
gulp.task('copy', function() {
  return gulp.src(['src/ui/statics/**'])
    .pipe(gulp.dest('build/'));
})

///////////////////////////////////////////////////////////////////////////////
//
// Watch both css and js
//
///////////////////////////////////////////////////////////////////////////////
gulp.task('watch', ['watch-js', 'watch-css'], function () {
  gutils.log(chalk.magenta('watching for changes...'));
});

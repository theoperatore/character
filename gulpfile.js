"use strict";

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var react = require('gulp-react');
var reactify = require('reactify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browsersync = require('browser-sync');
var del = require('del');


///////////////////////////////////////////////////////////////////////////////
//
// Fn to get vendor dependencies
//
///////////////////////////////////////////////////////////////////////////////
function getVendorKeys() {
  var pkg = require('./package.json');
  
  return Object.keys(pkg.dependencies);
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
// Lint TEH js!
//
///////////////////////////////////////////////////////////////////////////////
gulp.task('lint', function() {
  return gulp.src([
        'src/**/*.js', 
        'tests/**/*.js'
      ])
    .pipe(react())
    .pipe(jshint())
    .pipe(jshint.reporter('default', { verbose : true }))
    .pipe(jshint.reporter('fail'));
})


///////////////////////////////////////////////////////////////////////////////
//
// Compile JS
//
///////////////////////////////////////////////////////////////////////////////
gulp.task('compile-js', function() {
  var handleError;
  var stream;
  var bundler;
  var rebundle;

  bundler = browserify('./src/ui/index.js', {
    debug : true,
    cache : {},
    packageCache : {},
    fullPaths : true,
    verbose : true
  });

  getVendorKeys().forEach(function(vendor) {
    bundler.external(vendor);
  })

  bundler.transform(reactify, { es6 : true, target : "es5" });

  handleError = function(ev) {
    console.log("browserify error:", ev.message);
  }

  
  stream = bundler.bundle();
  stream.on('error', handleError);
  stream = stream.pipe(source('bundle.js'));
  return stream.pipe(gulp.dest('./build'));
})


///////////////////////////////////////////////////////////////////////////////
//
// Watch for js files to change, rebuild
//
///////////////////////////////////////////////////////////////////////////////
gulp.task('watch-js', function() {
  var handleError;
  var stream;
  var bundler;
  var rebundle;

  bundler = browserify('./src/ui/index.js', {
    debug : true,
    cache : {},
    packageCache : {},
    fullPaths : true,
    verbose : true
  });

  bundler = watchify(bundler);

  getVendorKeys().forEach(function(vendor) {
    bundler.external(vendor);
  })

  bundler.transform(reactify, { es6 : true, target : "es5" });

  handleError = function(ev) {
    console.log("browserify error:", ev.message);
  }

  rebundle = function() {
    stream = bundler.bundle();
    stream.on('error', handleError);
    stream = stream.pipe(source('bundle.js'));
    return stream.pipe(gulp.dest('./build'));
  }

  bundler.on('update', function(ev) {
    console.log("building: ", ev);
    rebundle();
  });

  return rebundle();
})


///////////////////////////////////////////////////////////////////////////////
//
// Build vendor dependancies
//
///////////////////////////////////////////////////////////////////////////////
gulp.task('build-vendor', function() {
  var bundler;
  var stream;
  var handleError;
  var rebundle;

  bundler = browserify({
    debug : true 
  });

  getVendorKeys().forEach(function(vendor) {
    bundler.require(vendor, { expose : vendor });
  });

  handleError = function(ev) {
    console.log("browserify vendor error:", ev.message);
  }

  stream = bundler.bundle();
  stream.on('error', handleError);
  stream = stream.pipe(source('vendor.js'));
  
  return stream.pipe(gulp.dest('./build'));
})


///////////////////////////////////////////////////////////////////////////////
//
// RUN ALL OF THE TESTS!
//
///////////////////////////////////////////////////////////////////////////////
gulp.task('mocha', function() {
  return gulp.src('tests/**/*.js', { read : false })
    .pipe(mocha({ 
      reporter : 'spec',
      timeout : 5000
    }));
})


///////////////////////////////////////////////////////////////////////////////
//
// Watch and build js files, but also reload a browser!
//
///////////////////////////////////////////////////////////////////////////////
gulp.task('default', ['clean', 'build-vendor', 'watch-js'], function() {
  browsersync({
    notify: true,
    port : 8080,
    server: {
      baseDir : __dirname
    }
  });

  gulp.watch(['index.html', 'build/bundle.js'], browsersync.reload);
  gulp.watch(['src/ui/style/*.css'], browsersync.reload);
})

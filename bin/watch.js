#! /usr/bin/env node

'use strict';

var browserify = require('browserify');
var watchify = require('watchify');
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

var deps = Object.keys(require('../package.json').dependencies);
var outdir = path.resolve(process.cwd(), './build');
var basedir = path.resolve(process.cwd(), './src/ui');

console.log(chalk.blue('[bundle]'), 'bundling source', chalk.gray(basedir + '/index.js'));


if (!fs.existsSync(outdir)) {
  fs.mkdirSync(outdir);
}


function logFile(file) {
  console.log(chalk.blue('[bundle]'), chalk.gray(file));
}


function logFinish() {
  console.log(chalk.green('[success]'), '=>', chalk.gray(outdir + '/bundle.js'));
}


function logError(err) {
  console.log(chalk.red('[ERROR] ' + err.message));
}


function rebundle(ids) {
  if (ids) {
    ids.forEach(function (id) {
      console.log(chalk.magenta('[changed]'), chalk.yellow(id));
    })
  }

  var writeStream = fs.createWriteStream(outdir + '/bundle.js');
  writeStream.on('finish', logFinish);

  b.external(deps)
    .bundle()
    .on('error', logError)
    .pipe(writeStream);
}


// BUNDLE IT
var b = browserify({ debug: true, 
  cache: {},
  packageCache: {},
  plugin: [watchify],
  entries: [basedir + '/index.js']
});

b.on('update', rebundle);
b.on('file', logFile);
b.on('log', function (msg) { console.log(chalk.gray(msg)); });
rebundle();
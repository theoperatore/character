#! /usr/bin/env node

'use strict';

var browserify = require('browserify');
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


var writeStream = fs.createWriteStream(outdir + '/bundle.js');
writeStream.on('finish', logFinish);

// BUNDLE IT
browserify({ debug: process.env.NODE_ENV !== 'production' })
  .add(basedir + '/index.js')
  .external(deps)
  .on('file', logFile)
  .bundle()
  .pipe(writeStream)




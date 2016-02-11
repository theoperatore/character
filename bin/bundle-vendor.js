#! /usr/bin/env node

'use strict';

var browserify = require('browserify');
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

var deps = Object.keys(require('../package.json').dependencies);
var outdir = path.resolve(process.cwd(), './build');

console.log(chalk.blue('[vendor]'), chalk.gray('bundling vendor...'));


if (!fs.existsSync(outdir)) {
  fs.mkdirSync(outdir);
}


function logFile(file, id) {
  console.log(chalk.blue('[vendor]'), chalk.gray(file));
}


function logFinish() {
  console.log(chalk.green('[success]'), '=>', chalk.gray(outdir + '/vendor.js'));
}


var writeStream = fs.createWriteStream(outdir + '/vendor.js');
writeStream.on('finish', logFinish);

// BUNDLE IT
browserify()
  .require(deps)
  .on('file', logFile)
  .bundle()
  .pipe(writeStream);




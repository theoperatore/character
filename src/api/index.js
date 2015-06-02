'use strict';

var config = require('../config');
var Firebase = require('firebase');
var Promise = require('es6-promise').Promise;

var db = new Firebase(config.dbroot);


// wrap Firebase `once` read in a promise
exports.once = function(path, type) {
  path = path || "./";
  type = type || "value";

  return new Promise((resolve, reject) => {
    db.child(path).once(type,
      (snapshot) => {
        resolve(snapshot);
      },
      (err) => {
        reject(err);
      })
  });
};

// wrap Firebase 'on' read in a promise
exports.on = function(path, type) {
  path = path || "./";
  type = type || "value";

  return new Promise((resolve, reject) => {
    db.child(path).on(type,
      (snapshot) => {
        resolve(snapshot);
      },
      (err) => {
        reject(err);
      })
  });
};

// auth wrapper
exports.auth = function(email, token) {
  return new Promise((resolve, reject) => {
    db.authWithPassword({
      email : email,
      password : token
    }, (err, payload) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(payload);
      }
    });
  })
};

// create a new user
exports.create = function(email, password) {
  return new Promise((resolve, reject) => {
    db.createUser({
      email : email,
      password : password
    }, (err, payload) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(payload);
      }
    });
  })
};

// send token in email
exports.token = function(email) {
  return new Promise((resolve, reject) => {
    db.resetPassword({
      email : email
    }, (err) => {
      if (err) {
        reject(err);
      }
      else {
        resolve("you're in...");
      }
    })
  })
};

// check if auth
exports.getAuth = db.getAuth();

// unAuth user
exports.unAuth = db.unauth();

// for anything else we might need...
exports.ref = db;
///////////////////////////////////////////////////////////////////////////////
//
// Might be deprecated when a real server is installed. But could always use
// firebase in addition to the web server; web server only used for serving
// app and not worrying about db stuff
//
///////////////////////////////////////////////////////////////////////////////
'use strict';

var config = require('../config');
var Firebase = require('firebase');
var Promise = require('es6-promise').Promise;

var db = new Firebase(config.dbroot);


// wrap Firebase `once` read in a promise
function once(path, type) {
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
function on(path, type) {
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
function auth(email, token) {
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
function create(email, password) {
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
function token(email) {
  return new Promise((resolve, reject) => {
    db.resetPassword({
      email : email
    }, (err) => {
      if (err) {
        reject(err);
      }
      else {
        resolve("sent");
      }
    })
  })
};

// update data at the specified path
function update(path, value) {
  return new Promise((resolve, reject) => {
    db.child(path).update(value, (err) => {
      if (err) {
        reject(err);
      }
      else {
        resolve("success");
      }
    })
  })
}

// create random password
function generatePass() {
  var chars = "0123456789abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var pass = "";

  for (var i = 0; i < 32; i++) {
    pass += chars[Math.floor(Math.random() * chars.length)];
  }

  return pass;
}

// login flow
function login(email) {
  var pass = generatePass();

  return create(email, pass).then((auth) => {
    localStorage.setItem("__cm_character_app_new_user__", "new_user_times_yeah");
    return token(email);
  }).catch((err) => {
    if (err.code === "EMAIL_TAKEN") {
      return token(email);
    }

    throw new Error(err);
  })
}


// api
exports.ref = db;
exports.update = update;
exports.token = token;
exports.create = create;
exports.auth = auth;
exports.on = on;
exports.once = once;
exports.login = login;
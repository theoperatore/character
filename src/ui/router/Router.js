'use strict';

var Pattern = require('url-pattern');
var keyed = new Pattern('/:k(/*)');
var routes = {};

// route not defined
function noop() {};

// do the routing
function change() {
  var path = window.location.hash.substr(1);
  var key;
  var params;
  var cb;

  if (path === '' || path === '/' || !path) {
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, "", window.location.origin + "#/");
    }

    key = { k : '/'};
  }
  else {
    key = keyed.match(path);
  }

  if (!routes[key.k] && routes['*']) {
    cb = routes['*'].cb;
    params = {};
  }
  else {
    cb = routes[key.k].cb || noop;
    params = routes[key.k].pattern.match(path) || {};
  }

  cb(params);
}

// set up the routing
exports.get = function(url, cb) {
  var key = keyed.match(url);

  if (url === '/' || url === '*') {
    key = { k : url };
  }

  routes[key.k] = {};
  routes[key.k].pattern = new Pattern(url);
  routes[key.k].cb = cb;
}

// do initial routing
exports.init = change;

// manual navigation
exports.nav = function(href) {
  window.location.hash = href.replace(/[\#]/g, '');
}

// listen for routing
window.addEventListener('hashchange', change);

'use strict';

// save the routing
var routes = {};

// route not defined
function noop() {};

// do the routing
function change() {
  var hash = window.location.hash;
  var path = window.location.hash.substr(1);
  var cb;

  if (path === '' || !path) {
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, "", window.location.href + "#/");
    }
    cb = routes['/'];
  }
  else {
    cb = routes[path];
  }

  (cb || routes['*'] || noop)();
}

// set up the routing
exports.get = function(url, cb) {
  routes[url] = cb;
}

// do initial routing
exports.nav = change;

// listen for routing
window.addEventListener('hashchange', change);

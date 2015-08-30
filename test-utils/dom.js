'use strict';

var jsdom = require('node-jsdom').jsdom;

(function() {
  var htmlStart = '<!DOCTYPE html><html>';
  var htmlClose = '</html>';
  var head = '<head></head>';
  var body = '<body></body>';

  var document = jsdom(htmlStart + head + body + htmlClose);

  global.window = document.parentWindow;
  global.document = document;
  global.navigator = document.parentWindow.navigator;
})();

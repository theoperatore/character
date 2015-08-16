'use strict';


var fs = require('fs');
var Tools = require('react-tools');
var original = require.extensions['.js'];

require.extensions['.js'] = function(module, filename) {

  if (filename.indexOf('node_modules') >= 0) {
    return original(module, filename);
  }

  var content = fs.readFileSync(filename, 'utf-8');
  var compiled = Tools.transform(content, { harmony : true });

  return module._compile(compiled, filename);
}

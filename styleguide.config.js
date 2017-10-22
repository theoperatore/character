const path = require('path');

module.exports = {
  require: [
    // so that components have access to the color vars
    path.resolve(__dirname, 'src/index.css'),
  ],
};

const path = require('path');

module.exports = {
  require: [
    // so that components have access to the color vars
    path.resolve(__dirname, 'src/index.css'),
  ],
  theme: {
    color: {
      // baseBackground: '#333333',
    },
  },
};

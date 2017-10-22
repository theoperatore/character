const path = require('path');

module.exports = {
  require: [
    // so that components have access to the color vars
    path.resolve(__dirname, 'src/index.css'),
    path.resolve(__dirname, 'src/hippo.css'),
    path.resolve(__dirname, 'node_modules/font-awesome/css/font-awesome.min.css'),
  ],
  theme: {
    color: {
      // baseBackground: '#333333',
    },
  },
};

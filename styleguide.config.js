const path = require('path');

module.exports = {
  require: [
    // so that components have access to the color vars
    path.resolve(__dirname, 'src/index.css'),
    // so that components have access to the icon fonts
    path.resolve(__dirname, 'src/hippo.css'),
    path.resolve(__dirname, 'node_modules/font-awesome/css/font-awesome.min.css'),
  ],
  title: 'Character (v3) Style Guide',
  sections: [
    {
      name: 'Atomic Components',
      content: 'src/components/atomic-components.md',
      components: 'src/components/{Button,Checkbox,Icon,Input,LoadingIndicator,Modal,Select}/*.js',
    },
    {
      name: 'Layout Components',
      content: 'src/components/layout-components.md',
    }
  ],
  theme: {
    color: {
      // baseBackground: '#333333',
    },
  },
};

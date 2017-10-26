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
      components: 'src/components/!(*Layout|*Dialog)/index.js',
    },
    {
      name: 'Layout Components',
      content: 'src/components/layout-components.md',
      components: 'src/components/*Layout/index.js',
    },
    {
      name: 'Dialogs',
      content: 'src/components/dialogs.md',
      components: 'src/components/*Dialog/index.js',
    },
    {
      name: 'Misc',
      components: '/src/components/(!*Layout|*Dialog|Button|Checkbox|Icon|Input|LoadingIndicator|Modal|Select|Type)/index.js',
    }
  ],
  theme: {
    color: {
      // baseBackground: '#333333',
    },
  },
};

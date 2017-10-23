Basic layout for having one section static/fixed while another section scrolls underneath.

```js
require('../Type');

// to simulate the document.body or some other container
const wrapperStyle = {
  height: '500px',
};

const navStyle = {
  padding: '8px',
  backgroundColor: 'var(--dark)',
  color: 'var(--white)',
};

const bodyStyle = {
  padding: '8px',
};

<div style={wrapperStyle}>
  <AppLayout
    nav={(
      <div style={navStyle}>
        <Type variant="heading-1" color="white">My Character</Type>
      </div>
    )}
    body={(
      <div style={bodyStyle}>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type variant="display-2">The end</Type>
      </div>
    )}
  />
</div>
```

Can also make it horizontal:

```js
require('../Type');

// to simulate the document.body or some other container
const wrapperStyle = {
  height: '500px',
};

const navStyle = {
  padding: '8px',
  backgroundColor: 'var(--dark)',
  color: 'var(--white)',
  minWidth: '180px',
  height: '100%',
};

const bodyStyle = {
  padding: '8px',
};

<div style={wrapperStyle}>
  <AppLayout
    horizontal
    nav={(
      <div style={navStyle}>
        <Type variant="heading-1" color="white">My Character</Type>
      </div>
    )}
    body={(
      <div style={bodyStyle}>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type>Content!</Type>
        <Type variant="display-2">The end</Type>
      </div>
    )}
  />
</div>
```

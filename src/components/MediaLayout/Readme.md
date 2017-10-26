Align items side-by-side, with a slight gap between them and vertical alignment configurable.

```js
require('../Type');

<MediaLayout
  media={<div style={{ height: '100px', width: '100px', backgroundColor: 'purple' }}/>}
  description={<div>
    <Type>What do you think about this purple?</Type>
    <Type variant="subtext">this is some really awesome content</Type>
  </div>}
/>
```
```js
require('../Type');

<MediaLayout
  align="top"
  media={<div style={{ height: '100px', width: '100px', backgroundColor: 'purple' }}/>}
  description={<Type>Align to the top</Type>}
/>
```

```js
require('../Type');

<MediaLayout
  align="bottom"
  media={<div style={{ height: '100px', width: '100px', backgroundColor: 'purple' }}/>}
  description={<Type>Align to the bottom</Type>}
/>
```

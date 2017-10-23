Align items side-by-side, with a slight gap between them, vertically centered.

```js
require('../Type');

<MediaLayout
  media={<div style={{ height: '100px', width: '100px', backgroundColor: 'purple' }}/>}
  description={[
    <Type>What do you think about this purple?</Type>,
    <Type variant="subtext">this is some really awesome content</Type>
  ]}
/>
```
```js
require('../Type');

<MediaLayout
  description={<Type>Just some normal content. No media to balance against</Type>}
/>
```

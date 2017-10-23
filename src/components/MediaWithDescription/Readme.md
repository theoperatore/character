Align items side-by-side, with a slight gap between them, vertically centered.

```js
<MediaWithDescription
  media={<div style={{ height: '100px', width: '100px', backgroundColor: 'purple' }}/>}
  description={[
    <p>heyo</p>,
    <p>this is some really awesome content</p>
  ]}
/>
```
```js
<MediaWithDescription
  description={<p>Just some normal content. No media to balance against</p>}
/>
```

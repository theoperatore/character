For when you want to load stuff and be indeterminate about it.

```js
<LoadingIndicator />
```

Just add color as prop

```js
<LoadingIndicator color="black" />
```

Can make the indicator render in the center of the nearest `relative` positioned parent:

```js
const parentStyle = {
  height: '150px',
  width: ' 300px',
  position: 'relative',
  backgroundColor: 'grey',
};

<div style={parentStyle}>
  <LoadingIndicator center />
</div>
```

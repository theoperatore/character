A simple style wrapper around `<input type="checkbox" />`. Can also use with a `label` via props.


Basic checkbox:

```js
<Checkbox />
```

Checkbox with label (default placement):

```js
<Checkbox label="You should select me!" />
```

Checkbox as controlled component:

```js
initialState = { checked: true };
const toggle = () => setState({ checked: !state.checked });

<Checkbox checked={state.checked} onChange={toggle} />
```

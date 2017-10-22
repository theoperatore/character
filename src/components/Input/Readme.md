A simple style wrapper around an HTML input. Any props that can be applied to a normal `<input />` tag, can be applied here, except for `type`;

Basic example:

```js
<Input placeholder="type something..." />
```

Disabled:

```js
<Input disabled value="I'm disabled"/>
```

Read-Only:

```js
<Input readOnly value="Can select but cannot change"/>
```

Email input:

```js
<Input type="email" placeholder="type your email" />
```

Phone number input:

```js
<Input type="phone" placeholder="type your phone number" />
```

 Number input:

```js
<Input type="number" />
```

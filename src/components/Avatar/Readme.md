For when you want to show an image that represents a user or character.

Without an image
```js
<Avatar
  circle
  altText="AP"
/>
```

With an image
```js
<Avatar
  circle
  src="http://lorempixel.com/350/350"
  altText="AP"
/>
```
With icon
```js
require('../Icon');

<Avatar
  circle
  icon={<Icon name="user-secret" />}
/>
```

Large image and avatar
```js
<Avatar
  circle
  src="http://lorempixel.com/128/128"
  altText="AP"
  size={64}
/>
```

Large image and avatar without the circle shape
```js
<Avatar
  src="http://lorempixel.com/128/128"
  altText="AP"
  size={64}
/>
```

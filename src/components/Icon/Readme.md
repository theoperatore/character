Power of the custom Hippo icons, plus all of font-awesome

```js
const hippoIcons = [
  'graph',
  'crown',
  'shield',
  'talk-chat',
  'talk-chat-group',
  'beer',
  'repo',
  'dollar',
  'group',
  'link',
  'link-broken',
  'chart',
  'attack',
  'equipment',
  'features',
  'anchor',
  'branching',
  'angle-double-right',
  'cog',
];

<div>
  {hippoIcons.map(ico => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}>
      <Icon name={ico} key={ico} size={32} />
      <span style={{ marginLeft: '1em' }}>{ico}</span>
    </div>
  ))}
</div>
```

Sizes: 16, 32, 48, 64 pixels

```js
<div>
  <Icon name="user-secret" />
  <Icon size={32} name="user-secret" />
  <Icon size={48} name="user-secret" />
  <Icon size={64} name="user-secret" />
</div>
```

Color however you want:

```js
<Icon style={{ color: 'blue' }} name="arrow-up" size={64}/>
```

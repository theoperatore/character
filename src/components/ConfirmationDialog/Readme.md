Used to show contextual information to a user with discrete choices. ConfirmationDialogs usually have titles, content, and buttons.

```js
require('../Button');
require('../Type');
const toggle = () => setState({ open: !state.open });

<div>
  <Button onClick={toggle}>Show Dialog</Button>
  <ConfirmationDialog
    onDismiss={toggle}
    active={state.open}
    title={<Type color="white" variant="heading-1">Check out this stuff</Type>}
    body={<Type>Here is some really cool things that you might need to check out. Or even edit. Maybe you need to edit a bunch of stuff while in this dialog.</Type>}
    controls={[
      <Button onClick={toggle} key="btn1" variant="bare" color="green">Ok</Button>,
      <Button onClick={toggle} key="btn2" variant="bare" color="red">Cancel</Button>,
    ]}
  />
</div>
```

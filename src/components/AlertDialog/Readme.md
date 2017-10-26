Uses the `<Modal />` component to render an "Are you sure?" dialog to the user.

**NOTE** There is no way to cancel the modal other than a user responding via yes/no.

```js
require('../Button');
require('../Type');

const toggle = () => setState({ active: !state.active });
const handleConfirm = answer => {
  toggle();
  alert(`User responded: ${answer}`);
};

<div>
  <Button color="red" onClick={toggle}>Delete</Button>
  <AlertDialog
    active={state.active}
    message={<Type>Are you sure you want to delete all of your data?</Type>}
    onConfirm={handleConfirm}
  />
</div>
```

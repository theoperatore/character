For when you want to display something on top of something else. This component only allows for positioning of the modal, you're on your own for the styles!

Users can press the `ESC` key to invoke `onDismiss` as well.

**NOTE** Modals must start with `active` set to `false`, otherwise the modal will not render properly.

```js
require('../Button');
require('../Type');
const toggleOpen = () => setState({ open: !state.open });

<div>
  <Button key="mtb" onClick={toggleOpen} variant="pill" color="proficient">Toggle</Button>
  <Modal key="mmm" onDismiss={toggleOpen} active={state.open}>
    <Type variant="display-2" color="attack-color">Engage!</Type>
  </Modal>
</div>

For when you want to display something on top of something else. This component only allows for positioning of the modal, you're on your own for the styles!

Users can press the `ESC` key to invoke `onDismiss` as well.

**NOTE** Modals must start with `active` set to `false`, otherwise the modal will not render properly.

Default usage:

```js
require('../Button');
require('../Type');

const modalStyle = {
  backgroundColor: 'var(--white)',
  maxHeight: '400px',
  padding: '8px',
  textAlign: 'center',
};
const toggleOpen = () => setState({ open: !state.open });

<div>
  <Button key="mtb" onClick={toggleOpen} variant="pill" color="proficient">Toggle</Button>
  <Modal key="mmm" onDismiss={toggleOpen} active={state.open}>
    <div style={modalStyle}>
      <Type variant="display-2" color="attack-color">Engage!</Type>
    </div>
  </Modal>
</div>
```

Can also fiddle with the placement for easily made Popup and Drawer components.

```js
require('../Button');
require('../Type');

const drawerStyle = {
  height: '100%',
  maxWidth: '180px',
  backgroundColor: 'var(--dark)',
  padding: '8px',
};

const bottomStyle = {
  maxWidth: '220px',
  backgroundColor: 'var(--dark)',
  padding: '8px',
  margin: '0 auto',
}

const toggleBottom = () => setState({ openBottom: !state.openBottom });
const toggleTop = () => setState({ openTop: !state.openTop });
const toggleLeft = () => setState({ openLeft: !state.openLeft });
const toggleRight = () => setState({ openRight: !state.openRight });

<div>
  <Button key="mta" onClick={toggleBottom} variant="pill" color="proficient">Toggle bottom</Button>
  <Button key="mtb" onClick={toggleLeft} variant="pill" color="proficient">Toggle left</Button>
  <Button key="mtc" onClick={toggleRight} variant="pill" color="proficient">Toggle right</Button>
  <Button key="mtd" onClick={toggleTop} variant="pill" color="proficient">Toggle top</Button>
  <Modal key="mmt" onDismiss={toggleTop} active={state.openTop} from="top">
    <div style={bottomStyle}>
      <Type variant="heading-1" color="attack-color">From the top of the screen</Type>
    </div>
  </Modal>
  <Modal key="mmp" onDismiss={toggleBottom} active={state.openBottom} from="bottom">
    <div style={bottomStyle}>
      <Type variant="heading-1" color="attack-color">From the bottom of the screen</Type>
    </div>
  </Modal>
  <Modal key="mml" onDismiss={toggleLeft} active={state.openLeft} from="left">
    <div style={drawerStyle}>
      <Type variant="heading-1" color="attack-color">From the left of the screen</Type>
    </div>
  </Modal>
  <Modal key="mmr" onDismiss={toggleRight} active={state.openRight} from="right">
    <div style={drawerStyle}>
      <Type variant="heading-1" color="attack-color">From the right of the screen</Type>
    </div>
  </Modal>
</div>
```

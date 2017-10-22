For when you want to display something on top of something else. This component only allows for positioning of the modal, you're on your own for the styles!

Users can press the `ESC` key to invoke `onDismiss` as well.

```js
<div>
  <button key="mtb" onClick={() => setState({ open: !state.open })}>toggle</button>
  {
    state.open && (
      <Modal key="mmm" onDismiss={() => setState({ open: !state.open })}>
        <div style={{ height: '400px', width: '400px', backgroundColor: 'white' }}>
          <h1>Heyo</h1>
        </div>
      </Modal>
    )
  }
</div>

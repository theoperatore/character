'use strict';

import React from 'react';
import Modal from '../components/Modal';
import Icon from '../components/Icon';

export default React.createClass({
  displayName: 'ConfirmDialog',


  propTypes: {
    message: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
    ]),
    onConfirm: React.PropTypes.func.isRequired,
    active: React.PropTypes.bool.isRequired
  },


  defaultMessage: 'Cancel and lose any unsaved changes?',


  getInitialState() {
    return {
      canDelete: false,
    }
  },


  componentWillReceiveProps(nextProps) {
    if (!nextProps.active) {
      this.setState({ canDelete: false });
    }
  },


  confirmChoice(choice) {
    if (choice === 'yes' && !this.state.canDelete) return;

    this.props.onConfirm(choice);
  },


  handleInputChange(ev) {
    if (ev.target.value === this.props.confirmName) {
      this.setState({ canDelete: true });
    }
    else {
      this.setState({ canDelete: false });
    }
  },


  getConfirmContent() {
    return (
      <section>
        <div className='modal-header'><h3>Delete Character?</h3></div>
        <div className='modal-content'>
          <div>{this.props.message || this.defaultMessage}</div>

          <input
            className='full-width mt2'
            placeholder='Enter character name to delete'
            onChange={this.handleInputChange}
          />
        </div>
        <div className='modal-footer'>
          <button disabled={!this.state.canDelete} onClick={this.confirmChoice.bind(this, 'yes')} className='text-red bg-red'>Delete</button>
          <button onClick={this.confirmChoice.bind(this, 'no')} className='text-green'>No</button>
        </div>
      </section>
    )
  },


  render() {
    return <Modal
      id='confirm-dialog'
      active={this.props.active}
      content={this.getConfirmContent()}
      onDismiss={() => {}}
      overflowAppContainer='body'
      overflowPaneContainer='body'
    />
  }
})
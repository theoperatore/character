'use strict';

import React, { Component } from 'react';

import Icon from '../../../components/Icon';
import Modal from '../../../components/Modal';
import { createSaveBtn, createCancelBtn } from '../../../components/Modal/buttons';
import ConfirmModal from '../ConfirmModal';

export default class extends React.Component {
  static displayName = 'TraitsDialog';

  static propTypes = {
    active: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onTraitChange: PropTypes.func.isRequired,
    onDismiss: PropTypes.func
  };

  state = {
    dirty: false,
    confirmCancel: false,
  };

  handleSave = () => {
    let desc = this.refs.newDesc.value.trim();

    let shouldUpdate = desc !== this.props.desc;

    if (shouldUpdate) {
      this.props.onTraitChange({ type: 'TRAIT_EDIT', data: { desc, id: this.props.id }});
      this.setState({ dirty: false });
      this.props.onDismiss();
    }
  };

  handleCancel = () => {
    if (!this.state.dirty) {
      return this.props.onDismiss();
    }

    this.setState({ confirmCancel: true });
  };

  handleConfirm = (answer) => {
    switch (answer) {
      case 'yes':
        this.setState({ dirty: false, confirmCancel: false });
        return this.props.onDismiss();
      case 'no':
        this.setState({ confirmCancel: false });
    }
  };

  makeDirty = () => {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  };

  getContent = () => {
    return (
      <section>
        <div className='modal-header'>
          <h3>{this.props.name}</h3>
        </div>
        <div className='modal-content'>
          <textarea defaultValue={this.props.desc} ref='newDesc' onChange={this.makeDirty}/>
        </div>
        <div className='modal-footer'>
          { createSaveBtn(this.handleSave) }
          { createCancelBtn(this.handleCancel) }
        </div>
      </section>
    )
  };

  render() {
    return <Modal
      id={`trait-${this.props.id}`}
      active={this.props.active}
      onDismiss={this.handleCancel}
      content={this.getContent()}
    >
      <ConfirmModal
        active={this.state.confirmCancel}
        onConfirm={this.handleConfirm}
      />
    </Modal>
  }
}
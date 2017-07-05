'use strict';

import React, { Component } from 'react';
import uuid from 'uuid/v1';
import Modal from '../../../components/Modal';
import ConfirmModal from '../ConfirmModal';
import { createSaveBtn, createCancelBtn } from '../../../components/Modal/buttons';

export default React.createClass({
  displayName: 'CreateEquipmentContainer',

  propTypes: {
    active: PropTypes.bool.isRequired,
    onDismiss: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      confirmCancel: false,
      dirty: false,
    }
  },

  makeDirty() {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  },

  handleSave() {
    let name = this.nameInput.value.trim();

    if (name === '') return;

    this.props.onCreate({
      type: 'EQUIPMENT_CONTAINER_CREATE',
      data: {
        id: `equip-container-${uuid()}`,
        name,
      },
    });

    this.setState({ dirty: false });
    this.props.onDismiss();
  },

  handleCancel() {
    if (this.state.dirty) {
      return this.setState({ confirmCancel: true });
    }

    this.setState({ dirty: false });
    this.props.onDismiss();
  },

  handleConfirm(answer) {
    switch (answer) {
      case 'no':
        return this.setState({ confirmCancel: false });
      case 'yes':
        this.setState({ confirmCancel: false, dirty: false });
        this.props.onDismiss();
    }
  },

  getContent() {
    return <section>
      <div className='modal-header'>
        <h3>
          <input
            type='text'
            ref={ref => this.nameInput = ref}
            placeholder='Equipment container name'
            onChange={this.makeDirty}
          />
        </h3>
      </div>
      <div className='modal-footer'>
        { createSaveBtn(this.handleSave) }
        { createCancelBtn(this.handleCancel) }
      </div>
    </section>
  },

  render() {
    return <Modal
      id='create-new-equipment-container'
      active={this.props.active}
      content={this.getContent()}
      onDismiss={this.handleCancel}
    >
      <ConfirmModal
        active={this.state.confirmCancel}
        onConfirm={this.handleConfirm}
      />
    </Modal>
  },
});
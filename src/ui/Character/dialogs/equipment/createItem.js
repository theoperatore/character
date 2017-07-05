'use strict';

import PropTypes from 'prop-types';

import React, { Component } from 'react';
import uuid from 'uuid/v1';
import Modal from '../../../components/Modal';
import ConfirmModal from '../ConfirmModal';
import { createSaveBtn, createCancelBtn } from '../../../components/Modal/buttons';

export default class extends React.Component {
  static displayName = 'CreateEquipmentItem';

  static propTypes = {
    containerId: PropTypes.string.isRequired,
    onDismiss: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    onCreate: PropTypes.func.isRequired,
  };

  state = {
    dirty: false,
    confirmCancel: false,
  };

  makeDirty = () => {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  };

  handleSave = () => {
    let name = this.nameInput.value.trim();
    let desc = this.descInput.value.trim();

    if (name === '') return;

    this.props.onCreate({
      type: 'EQUIPMENT_ITEM_CREATE',
      data: {
        item: {
          id: `item-${uuid()}`,
          name,
          desc,
        },
        container: {
          id: this.props.containerId,
        },
      },
    });

    this.setState({ dirty: false });
    this.props.onDismiss();
  };

  handleCancel = () => {
    if (this.state.dirty) {
      return this.setState({ confirmCancel: true });
    }

    this.setState({ dirty: false, confirmCancel: false });
    this.props.onDismiss();
  };

  handleConfirm = (answer) => {
    switch (answer) {
      case 'no':
        return this.setState({ confirmCancel: false });
      case 'yes':
        this.setState({ confirmCancel: false, dirty: false });
        this.props.onDismiss();
    }
  };

  renderCreateContent = () => {
    return <section>
      <div className='modal-header'>
        <h3>
          <input
            ref={ref => this.nameInput = ref}
            type='text'
            placeholder='New item name'
            onChange={this.makeDirty}
          />
        </h3>
      </div>
      <div className='modal-content'>
        <textarea
          ref={ref => this.descInput = ref}
          placeholder='item description'
          onChange={this.makeDirty}
        ></textarea>
      </div>
      <div className='modal-footer'>
        { createSaveBtn(this.handleSave) }
        { createCancelBtn(this.handleCancel) }
      </div>
    </section>
  };

  render() {
    return <Modal
      id='create-equipment-item'
      onDismiss={this.handleCancel}
      active={this.props.active}
      content={this.renderCreateContent()}
    >
      <ConfirmModal
        active={this.state.confirmCancel}
        onConfirm={this.handleConfirm}
      />
    </Modal>
  }
}
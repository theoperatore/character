'use strict';

import React from 'react';
import Modal from '../../components/Modal';
import { createSaveBtn, createCancelBtn } from '../../components/Modal/buttons';
import ConfirmModal from '../../dialogs/ConfirmModal';

export default React.createClass({
  displayName: 'EditEquipmentContainer',

  propTypes: {
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onDismiss: React.PropTypes.func.isRequired,
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
    if (name === this.props.name) {
      this.setState({ dirty: false });
      return this.props.onDismiss();
    }

    this.props.onChange({
      type: 'EQUIPMENT_CONTAINER_EDIT',
      data: {
        id: this.props.id,
        name,
      },
    });
    this.props.onDismiss();
  },

  handleCancel() {
    if (this.state.dirty) {
      this.setState({ confirmCancel: true });
    }

    this.setState({ dirty: false });
    this.props.onDismiss();
  },

  handleConfirm(answer) {
    switch (answer) {
      case 'no':
        return this.setState({ confirmCancel: false });
      case 'yes':
        this.setState({ dirty: false });
        this.props.onDismiss();
    }
  },

  renderEditContent() {
    return <section>
      <div className='modal-header'>
        <h3>
          <input
            type='text'
            ref={ref => this.nameInput = ref}
            placehodler={this.props.name}
            defaultValue={this.props.name}
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
      id={`edit-${this.props.id}`}
      active={this.props.active}
      onDismiss={this.handleCancel}
      content={this.renderEditContent()}
    >
      <ConfirmModal
        active={this.state.confirmCancel}
        onConfirm={this.handleConfirm}
      />
    </Modal>
  },
})

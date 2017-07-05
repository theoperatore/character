import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../components/Modal';
import Icon from '../components/Icon';
import { createCancelBtn } from '../components/Modal/buttons';
import { generateRandomName } from '../generateName';

export default class SimpleCharacterCreateModal extends Component {
  static propTypes = {
    onCreate: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
  }

  state = {
    simpleMode: true,
    canCreate: false,
  }

  handleSave() {
    if (!this.state.canCreate) return;

    let name = this.nameInput.value.trim();

    if (name === '' || !name) return;

    this.props.onCreate({
      type: 'CHARACTER_CREATE',
      data: {
        name,
      }
    });

    this.props.onDismiss();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active) {
      this.setState({ canCreate: false });
    }
  }

  handleCancel() {
    this.props.onDismiss();
  }

  handleChange(ev) {
    if (ev.target.value.trim() !== '') {
      this.setState({ canCreate: true })
    }
    else {
      this.setState({ canCreate: false })
    }
  }

  pickRandomName() {
    this.nameInput.value = generateRandomName();
    this.setState({ canCreate: true });
  }

  getSimpleContent() {
    return <section>
      <div className='modal-header'>
        <h3>Create A New Character</h3>
      </div>
      <div className='modal-content'>
        <div className='inputs'>
          <label
            htmlFor='character-name'
            className='mb2'
          >Character Name</label>
          <input
            type='text'
            id='character-name'
            ref={ref => this.nameInput = ref}
            placeholder='Pick a good one...'
            onChange={this.handleChange}
          />
        </div>
      </div>
      <div className='modal-footer'>
        <button
          onClick={this.handleSave}
          disabled={!this.state.canCreate}
          className='text-green'
        ><Icon icon='fa fa-user-plus'/> Create</button>
        <button
          onClick={this.pickRandomName}
        ><Icon icon='fa fa-random'/> Random Name</button>
        { createCancelBtn(this.handleCancel) }
      </div>
    </section>
  }

  render() {
    return <Modal
      id='simple-character-create-modal'
      active={this.props.active}
      onDismiss={this.props.onDismiss}
      content={this.getSimpleContent()}
      overflowAppContainer='body'
      overflowPaneContainer='body'
    />
  }
}

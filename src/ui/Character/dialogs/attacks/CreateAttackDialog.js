

import PropTypes from 'prop-types';

import React, { Component } from 'react';
import uuid from 'uuid/v1';
import Modal from '../../../components/Modal';
import Icon from '../../../components/Icon';
import ConfirmModal from '../ConfirmModal';

export default class extends React.Component {
  static displayName = 'CreateAttackDialog';

  static propTypes = {
    active: PropTypes.bool.isRequired,
    dismiss: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
  };

  state = {
    confirm: false,
    dirty: false
  };

  makeDirty = () => {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  };

  dismiss = () => {
    if (this.state.dirty) {
      this.setState({ confirm: true });
      return;
    }

    this.props.dismiss();
  };

  handleConfirm = (answer) => {
    switch (answer) {
      case 'yes':
        this.setState({ confirm: false, dirty: false });
        this.props.dismiss();
        break;
      case 'no':
        this.setState({ confirm: false });
        break;
    }
  };

  save = () => {
    if (this.refs.name.value.trim() !== '') {
      let name = this.refs.name.value.trim();
      let desc = this.refs.desc.value.trim();
      let id = `attack-${uuid()}`;
      let data = { name, desc, id };

      this.props.onCreate({ type: 'ATTACK_CREATE', data});
    }

    this.setState({ confirm: false, dirty: false });
    this.props.dismiss();
  };

  content = () => {
    return <section>
      <div className='modal-header'>
        <h3>
          <input type='text' placeholder='Attack name' ref='name' onChange={this.makeDirty}/>
        </h3>
      </div>
      <div className='modal-content'>
        <textarea placeholder='description' ref='desc' onChange={this.makeDirty}></textarea>
      </div>
      <div className='modal-footer'>
        <button className='text-green' onClick={this.save}><Icon icon='fa fa-pencil'/> Save</button>
        <button className='text-red' onClick={this.dismiss}><Icon icon='fa fa-remove'/> Cancel</button>
      </div>
    </section>
  };

  render() {
    return (
      <span>
        <Modal active={this.props.active} id='create-attack-dialog' onDismiss={this.dismiss} content={this.content()} />
        <ConfirmModal active={this.state.confirm} onConfirm={this.handleConfirm} />
      </span>
    )
  }
}
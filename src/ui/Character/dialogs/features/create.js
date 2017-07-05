'use strict';

import React, { Component } from 'react';
import uuid from 'uuid/v1';

import Icon from '../../../components/Icon';
import Modal from '../../../components/Modal';
import ConfirmModal from '../ConfirmModal';

export default class extends React.Component {
  static displayName = 'CreateNewFeatureDialog';

  static propTypes = {
    active: PropTypes.bool.isRequired,
    dismiss: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
  };

  state = {
    dirty: false,
    confirm: false,
    selectedType: 'PASSIVE',
    hasCharges: false,
    cctotal: ''
  };

  makeDirty = () => {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  };

  confirm = (answer) => {
    switch (answer) {
      case 'yes':
        this.setState({ confirm: false, dirty: false, selectedType: 'PASSIVE', hasCharges: false, cctotal: '' });
        this.props.dismiss();
        break;
      case 'no':
        this.setState({ confirm: false });
        break;
    }
  };

  handleCreate = () => {
    let data = {
      feature: {
        name: this.refs.newName.value.trim(),
        desc: this.refs.newDesc.value.trim(),
        type: this.state.selectedType,
        id: `feature-${uuid()}`,
      }
    }

    if (this.state.hasCharges && this.refs.ccname.value.trim() !== '') {
      data.classCharge = {};
      data.classCharge.name = this.refs.ccname.value.trim();
      data.classCharge.charges = this.state.cctotal !== '' ? this.state.cctotal : 0;
      data.classCharge.current = this.state.cctotal !== '' ? this.state.cctotal : 0;
      data.classCharge.id = `classCharge-${uuid()}`;
      data.feature.classChargesId = data.classCharge.id;
    }

    if (data.feature.name !== '') {
      this.props.onCreate({ type: 'FEATURE_CREATE', data });
      this.props.dismiss();
    }
  };

  handleCancel = () => {
    if (this.state.dirty) {
      this.setState({ confirm: true });
      return;
    }

    this.setState({ confirm: false, dirty: false, selectedType: 'PASSIVE', hasCharges: false, cctotal: '' });
    this.props.dismiss();
  };

  handleTypeSelect = (selectedType) => {
    this.setState({ selectedType, dirty: true });
  };

  validateNumber = (ev) => {
    if (ev.target.value.trim() === '') {
      this.setState({ cctotal: ev.target.value.trim(), dirty: true });
      return;
    }

    let num = Number(ev.target.value);

    if (!isNaN(num)) {
      this.setState({ cctotal: num, dirty: true });
    }
  };

  content = () => {
    return (
      <section>
        <div className='modal-header'>
          <h3>
            <input type='text' ref='newName' placeholder='Feature Name' onChange={this.makeDirty}/>
          </h3>
        </div>
        <div className='modal-content'>
          <div>
            <textarea ref='newDesc' placeholder='Feature Description' onChange={this.makeDirty}></textarea>
          </div>
          <label>Feature Type</label>
          <div className='row'>
            <div className='col-1-4'>
                <div onClick={this.handleTypeSelect.bind(this, 'PASSIVE')} className={`feature-type ${this.state.selectedType === 'PASSIVE' ? 'selected' : ''}`}>
                  <Icon icon='fa fa-cube'/>
                </div>
              </div>
              <div className='col-1-4'>
                <div onClick={this.handleTypeSelect.bind(this, 'ATTACK')} className={`feature-type text-attack ${this.state.selectedType === 'ATTACK' ? 'selected' : ''}`}>
                  <Icon icon='icon-attack'/>
                </div>
              </div>
              <div className='col-1-4'>
                <div onClick={this.handleTypeSelect.bind(this, 'SPELL')} className={`feature-type text-spell ${this.state.selectedType === 'SPELL' ? 'selected' : ''}`}>
                  <Icon icon='icon-repo'/>
                </div>
              </div>
              <div className='col-1-4'>
                <div onClick={this.handleTypeSelect.bind(this, 'DEFENSE')} className={`feature-type text-str ${this.state.selectedType === 'DEFENSE' ? 'selected' : ''}`}>
                  <Icon icon='icon-shield'/>
                </div>
              </div>
          </div>
          <div className='inputs'>
            <input id='class-charge' type='checkbox' checked={this.state.hasCharges} onChange={(ev) => this.setState({ hasCharges: ev.target.checked, dirty: true })}/>
            <label htmlFor='class-charge'>Enables a class charge</label>
          </div>
          {
            this.state.hasCharges ? 
            <div>
              <div className='inputs'>
                <input ref='ccname' type='text' placeholder='display name' onChange={this.makeDirty}/>
              </div>
              <div className='inputs'>
                <input ref='cctotal' type='text'  value={this.state.cctotal} placeholder='number of charges' onChange={this.validateNumber}/>
                <p><small>Class charges are displayed on the <strong><em>Attacks Pane</em></strong></small></p>
              </div>
            </div>
            : null
          }
        </div>
        <div className='modal-footer'>
          <button onClick={this.handleCreate} className='text-green'><Icon icon='fa fa-pencil' /> Save</button>
          <button onClick={this.handleCancel} className='text-red'><Icon icon='fa fa-remove' /> Cancel</button>
        </div>
      </section>
    )
  };

  render() {
    return <span>
      <Modal active={this.props.active} id='create-new-feature' content={this.content()} onDismiss={this.handleCancel} />
      <ConfirmModal active={this.state.confirm} onConfirm={this.confirm} />
    </span>
  }
}
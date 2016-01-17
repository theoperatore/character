'use strict';

import React from 'react';
import uuid from 'node-uuid';

import Icon from '../../components/Icon';
import Modal from '../../components/Modal';

export default React.createClass({
  displayName: 'CreateNewFeatureDialog',

  propTypes: {
    onCreate: React.PropTypes.func.isRequired
  },

  noop() {},
  getInitialState() {
    return {
      dirty: false,
      confirm: false,
      selectedType: 'PASSIVE'
    }
  },


  isDirty() {
    return this.state.isDirty;
  },


  makeDirty() {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  },


  confirm() {
    this.setState({ confirm: true });
  },


  createConfirmDialog() {
    return (
      <section>
        <div className='modal-header'><h3>Are You Sure?</h3></div>
        <div className='modal-content'>
          <p>Cancel and lose any unsaved changes?</p>
        </div>
        <div className='modal-footer'>
          <button onClick={this.handleYes} className='bg-green text-green'>
            <p>Yes</p>
          </button>
          <button onClick={this.handleNo} className='bg-red text-red'>
            <p>No</p>
          </button>
        </div>
      </section>
    )
  },


  handleCreate() {
    let data = {
      name: this.refs.newName.value.trim(),
      desc: this.refs.newDesc.value.trim(),
      type: this.state.selectedType,
      id: uuid.v1()
    }

    if (data.name !== "") {
      this.props.onCreate({ type: 'FEATURE_CREATE', data });
      this.props.parentDismiss();
    }
  },


  handleCancel() {
    if (this.state.dirty) {
      this.setState({ confirm: true });
      return;
    }

    this.props.parentDismiss();
  },


  handleTypeSelect(selectedType) {
    this.setState({ selectedType, dirty: true });
  },


  handleYes() {
    this.setState({ confirm: false}, () => {
      this.props.parentDismiss();
    })
  },


  handleNo() {
    this.setState({ confirm: false });
  },


  render() {
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
          <div className='row'>
            <div className='col-1-3'>
                <div onClick={this.handleTypeSelect.bind(this, 'PASSIVE')} className={`feature-type ${this.state.selectedType === 'PASSIVE' ? 'selected' : ''}`}>
                  <Icon icon='fa fa-cube'/>
                </div>
              </div>
              <div className='col-1-3'>
                <div onClick={this.handleTypeSelect.bind(this, 'ATTACK')} className={`feature-type text-attack ${this.state.selectedType === 'ATTACK' ? 'selected' : ''}`}>
                  <Icon icon='icon-attack'/>
                </div>
              </div>
              <div className='col-1-3'>
                <div onClick={this.handleTypeSelect.bind(this, 'SPELL')} className={`feature-type text-spell ${this.state.selectedType === 'SPELL' ? 'selected' : ''}`}>
                  <Icon icon='icon-repo'/>
                </div>
              </div>
          </div>
        </div>
        <div className='modal-footer'>
          <button onClick={this.handleCreate} className='bg-green text-green'>
            <p><Icon icon='fa fa-pencil' /> Save</p>
          </button>
          <button onClick={this.handleCancel} className='bg-red text-red'>
            <p><Icon icon='fa fa-remove' /> Cancel</p>
          </button>
        </div>
        <Modal id='feature-create-dialog' content={this.createConfirmDialog()} onDismiss={this.noop} active={this.state.confirm} />
      </section>
    )
  }
})
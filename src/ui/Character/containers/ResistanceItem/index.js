'use strict';

import PropTypes from 'prop-types';

import React, { Component } from 'react';
import Modal from '../../../components/Modal';
import Icon from '../../../components/Icon';
import ConfirmModal from '../../dialogs/ConfirmModal';

export default class extends React.Component {
  static displayName = 'ResistanceItem';

  static propTypes = {
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onResistanceChange: PropTypes.func.isRequired
  };

  state = {
    details: false,
    confirm: false,
    edit: false,
    dirty: false,
    message: null,
    willRemove: false
  };

  makeDirty = () => {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  };

  handleEditSave = () => {
    // save edits
    if (this.state.edit) {
      let name = this.refs.newName.value;
      let desc = this.refs.newDesc.value;
      let shouldUpdate = name !== this.props.name || desc !== this.props.desc;

      if (shouldUpdate) {
        this.props.onResistanceChange({ type: 'RESISTANCES_EDIT', data: { id: this.props.id, name, desc }});
      }

      this.setState({ edit: false, dirty: false });
      return;
    }

    // enter edit mode
    this.setState({ edit: true });
  };

  handleCancelRemove = () => {
    // cancel
    if (this.state.edit) {
      if (this.state.dirty) {
        this.setState({ confirm: true, message: null });
        return;
      }

      this.setState({ edit: false });
      return;
    }

    // remove
    this.setState({ confirm: true, message: `Are you sure you want to delete ${this.props.name} forever?`, willRemove: true });
  };

  getDetailsContent = () => {
    return <section>
      <div className='modal-header'>
        <h3>{
          this.state.edit ?
          <input type='text' ref='newName' placeholder={this.props.name} defaultValue={this.props.name} onChange={this.makeDirty}/> 
          : this.props.name
        }</h3>
      </div>
      <div className='modal-content'>{
        this.state.edit ?
        <textarea ref='newDesc' placeholder={this.props.desc} defaultValue={this.props.desc} onChange={this.makeDirty}></textarea>
        : <p>{this.props.desc}</p>
      }</div>
      <div className='modal-footer'>
        <button onClick={this.handleEditSave} className='text-green'><Icon icon='fa fa-pencil'/> {this.state.edit ? 'Save' : 'Edit'}</button>
        <button onClick={this.handleCancelRemove} className='text-red'><Icon icon='fa fa-remove'/> {this.state.edit ? 'Cancel' : 'Remove'}</button>
      </div>
    </section>
  };

  dismiss = () => {
    if (this.state.dirty) {
      this.setState({ confirm: true, message: null });
      return;
    }

    this.setState({ details: false });
  };

  handleConfirm = (answer) => {
    switch (answer) {
      case 'yes':
        if (this.state.willRemove) {
          this.props.onResistanceChange({ type: 'RESISTANCES_DELETE', data: { id: this.props.id }});
        }
        this.setState({ edit: false, dirty: false, details:false, confirm: false, willRemove: false });
        break;
      case 'no':
        this.setState({ confirm: false });
        break;
    }
  };

  render() {
    return ( 
      <div className='container-list-item pl2' onClick={() => this.setState({ details: true })}>
        <div className='container-list-item-glyph'>
          <Icon icon='fa fa-cube' />
        </div>
        <div className='container-list-item-content'>
          <span className='skill-item-name'>{this.props.name}</span>
        </div>
        <Modal id={`resistance-${this.props.id}`} active={this.state.details} content={this.getDetailsContent()} onDismiss={this.dismiss}/>
        <ConfirmModal message={this.state.message} active={this.state.confirm} onConfirm={this.handleConfirm}/>
      </div>
    )
  }
}
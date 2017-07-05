'use strict';

import PropTypes from 'prop-types';

import React, { Component } from 'react';

import ListItem from '../../../components/ListItem/v2';
import Modal from '../../../components/Modal';
import Icon from '../../../components/Icon';
import ConfirmModal from '../../dialogs/ConfirmModal';

export default class extends React.Component {
  static displayName = 'AttackItem';

  static propTypes = {
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  state = {
    dirty: false,
    edit: false,
    details: false,
    confirm: false,
    willRemove: false,
    message: null
  };

  makeDirty = () => {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  };

  dismiss = () => {
    if (this.state.dirty) {
      this.setState({ confirm: true, message: null });
      return;
    }

    this.setState({ dirty: false, edit: false, details: false, confirm: false, willRemove: false });
  };

  deleteOrCancel = () => {
    // cancel
    if (this.state.edit) {
      if (this.state.dirty) {
        this.setState({ confirm: true, message: null });
        return;
      }

      this.setState({ dirty: false, confirm: false, edit: false });
      return;
    }

    // delete
    this.setState({ confirm: true, message: `Delete ${this.props.name} forever?`, willRemove: true });
  };

  editOrSave = () => {
    // save
    if (this.state.edit) {
      let name = this.refs.name.value.trim();
      let desc = this.refs.desc.value.trim();

      if (name !== '') {
        this.props.onChange({ type: 'ATTACK_EDIT', data: { name, desc, id: this.props.id }});
        this.setState({ dirty: false, confirm: false, message: null, edit: false, willRemove: false });
      }
      return;
    }

    // edit
    this.setState({ edit: true });
  };

  confirm = (answer) => {
    switch (answer) {
      case 'yes':
        //delete
        if (this.state.willRemove) {
          this.props.onChange({ type: 'ATTACK_DELETE', data: { id: this.props.id }});
          this.setState({ confirm: false, edit: false, details: false, dirty: false, willRemove: false });
          return;
        }

        this.setState({ confirm: false, edit: false, willRemove: false, dirty: false });
        break;
      case 'no':
        this.setState({ confirm: false, willRemove: false });
        break;
    }
  };

  content = () => {
    return <section>
      <div className='modal-header'>
        <h3>
        {
          this.state.edit ?
          <input type='text' ref='name' placeholder={this.props.name} defaultValue={this.props.name} onChange={this.makeDirty}/>
          : this.props.name
        }
        </h3>
      </div>
      <div className='modal-content'>
        {
          this.state.edit ?
          <textarea ref='desc' placeholder={this.props.desc} defaultValue={this.props.desc} onChange={this.makeDirty}></textarea>
          : <p>{this.props.desc}</p>
        }
      </div>
      <div className='modal-footer'>
        <button onClick={this.editOrSave} className='text-green'><Icon icon='fa fa-pencil'/> {this.state.edit ? 'Save' : 'Edit'}</button>
        <button onClick={this.deleteOrCancel} className='text-red'><Icon icon='fa fa-remove'/> {this.state.edit ? 'Cancel' : 'Delete'}</button>
      </div>
    </section>
  };

  render() {
    return (
      <ListItem
        name={this.props.name}
        glyph={<Icon icon='icon-attack' className='ml2'/>}
        glyphCss={'text-attack'}
        onClick={() => this.setState({ details: true })}
      >
        <Modal active={this.state.details} id={`atk-${this.props.id}`} onDismiss={this.dismiss} content={this.content()}/>
        <ConfirmModal active={this.state.confirm} onConfirm={this.confirm} message={this.state.message} />
      </ListItem>
    )
  }
}

'use strict';

import React, { Component } from 'react';

import Icon from '../../../../components/Icon';
import ConfirmModal from '../../ConfirmModal';

export default React.createClass({
  displayName: 'LanguagesDialog',


  getInitialState() {
    return ({
      editMode: false,
      dirty: false,
      confirm: false,
      message: null,
    })
  },


  propTypes: {
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onLanguageChange: PropTypes.func.isRequired,
    dismiss: PropTypes.func
  },


  makeDirty() {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  },


  isDirty() {
    return this.state.dirty;
  },


  editSave() {
    if (this.state.editMode) {
      let name = this.refs.newName.value.trim();
      let desc = this.refs.newDesc.value.trim();

      let shouldUpdate = name !== this.props.name || desc !== this.props.desc;

      if (shouldUpdate) {
        let data = {
          id: this.props.id,
          name,
          desc,
        };

        this.props.onLanguageChange({ type: 'LANGUAGE_EDIT', data });
      }
    }

    this.setState({ editMode: !this.state.editMode, dirty: false })
  },


  handleRemove() {
    if (this.state.editMode) {
      this.setState({ editMode: false, dirty: false });
      return;
    }

    this.setState({ confirm: true, message: `Delete Language: ${this.props.name}?` });
  },

  handleAnswer(choice) {
    switch(choice) {
      case 'yes':
        this.props.onLanguageChange({ type: 'LANGUAGE_DELETE', data: { id: this.props.id }});
        break;
      case 'no':
        this.setState({ confirm: false });
        break;
    }
  },


  render() {

    return (
      <section>
        <div className='modal-header'>
          <h3>
          {
            this.state.editMode ? 
            <input type='text' defaultValue={this.props.name} placeholder={this.props.name} ref='newName' onChange={this.makeDirty}/> :
            this.props.name
          }
          </h3>
        </div>
        <div className='modal-content'>
          {
            this.state.editMode ?
            <textarea defaultValue={this.props.desc} ref='newDesc' placeholder={this.props.desc} onChange={this.makeDirty}/> :
            <p>{this.props.desc}</p>
          }
        </div>
        <div className='modal-footer'>
          <button onClick={this.editSave} className={'text-green'}>
            <p><Icon icon='fa fa-pencil' /> {this.state.editMode ? 'Save' : 'Edit'}</p>
          </button>
          <button onClick={this.handleRemove} className={'text-red'}>
            <p><Icon icon='fa fa-remove' /> {this.state.editMode ? 'Cancel' : 'Remove'}</p>
          </button>
        </div>
        <ConfirmModal
          active={this.state.confirm}
          message={this.state.message}
          onConfirm={this.handleAnswer}
        />
      </section>
    )
  }
})
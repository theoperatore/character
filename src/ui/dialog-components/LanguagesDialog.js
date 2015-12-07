'use strict';

import React from 'react';

import Icon from '../components/Icon';

export default React.createClass({
  displayName: 'LanguagesDialog',


  getInitialState() {
    return ({
      editMode: false
    })
  },


  propTypes: {
    name: React.PropTypes.string.isRequired,
    desc: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    onLanguageChange: React.PropTypes.func.isRequired,
    dismiss: React.PropTypes.func
  },


  editSave() {
    if (this.state.editMode) {
      let name = this.refs.newName.value.trim();
      let desc = this.refs.newDesc.value.trim();

      let shouldUpdate = name !== this.props.name || desc !== this.props.desc;

      if (shouldUpdate) {
        this.props.onLanguageChange({ type: 'LANGUAGE_EDIT', name, desc, id: this.props.id });  
      }
    }

    this.setState({ editMode: !this.state.editMode })
  },


  handleRemove() {
    if (this.state.editMode) {
      this.setState({ editMode: false });
      return;
    }

    let result = window.confirm(`Delete Language: ${this.props.name}?`);
    if (result) {
      this.props.onLanguageChange({ type: 'LANGUAGE_DELETE', id: this.props.id });
      this.props.dismiss();
    }
  },


  render() {

    return (
      <section>
        <div className='modal-header'>
          <h3>
          {
            this.state.editMode ? 
            <input type='text' defaultValue={this.props.name} ref='newName' /> :
            this.props.name
          }
          </h3>
        </div>
        <div className='modal-content'>
          {
            this.state.editMode ?
            <textarea defaultValue={this.props.desc} ref='newDesc' /> :
            <p>{this.props.desc}</p>
          }
        </div>
        <div className='modal-footer'>
          <button onClick={this.editSave} className={this.state.editMode ? 'bg-green text-green' : ''}>
            <p><Icon icon='fa fa-pencil' /> {this.state.editMode ? 'Save' : 'Edit'}</p>
          </button>
          <button onClick={this.handleRemove} className={this.state.editMode ? 'bg-red text-red' : ''}>
            <p><Icon icon='fa fa-remove' /> {this.state.editMode ? 'Cancel' : 'Remove'}</p>
          </button>
        </div>
      </section>
    )
  }
})
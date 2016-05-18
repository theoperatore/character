'use strict';

import React from 'react';

import Icon from '../../components/Icon';

export default React.createClass({
  displayName: 'TraitsDialog',


  getInitialState() {
    return ({
      editMode: false,
      dirty: false
    })
  },


  propTypes: {
    name: React.PropTypes.string.isRequired,
    desc: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    onTraitChange: React.PropTypes.func.isRequired,
    dismiss: React.PropTypes.func
  },


  editSave() {
    if (this.state.editMode) {
      let desc = this.refs.newDesc.value.trim();

      let shouldUpdate = desc !== this.props.desc;

      if (shouldUpdate) {
        this.props.onTraitChange({ type: 'TRAIT_EDIT', data: { desc, id: this.props.id }});
      }
    }

    this.setState({ editMode: !this.state.editMode, dirty: false })
  },


  makeDirty() {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  },


  isDirty() {
    return this.state.dirty;
  },


  render() {
    return (
      <section>
        <div className='modal-header'>
          <h3>{this.props.name}</h3>
        </div>
        <div className='modal-content'>
          {
            this.state.editMode ?
            <textarea defaultValue={this.props.desc} ref='newDesc' onChange={this.makeDirty}/> :
            <p>{this.props.desc}</p>
          }
        </div>
        <div className='modal-footer'>
          <button onClick={this.editSave} className={this.state.editMode ? 'bg-green text-green' : ''}>
            <p><Icon icon='fa fa-pencil' /> {this.state.editMode ? 'Save' : 'Edit'}</p>
          </button>
        </div>
      </section>
    )
  }
})